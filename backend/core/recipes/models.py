import pint
from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import User
from django.db.models import Index
from django.contrib.postgres.search import SearchVectorField
from django.contrib.postgres.indexes import GinIndex
from django.conf import settings

from .validators import validate_unit_of_measure
from .utils import number_str_to_float

class Source(models.Model):
    name = models.CharField(max_length=150, verbose_name='Source|url')
    url = models.URLField(max_length=500, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Source'
        verbose_name_plural = 'Sources'
        ordering = ["name"]

class Category(models.Model):
    name = models.CharField(
        max_length=120,
        unique=True,
    )
    type = models.CharField(max_length=50)

    class Meta:
        ordering = ('name',)
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.name


class Recipe(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    categories = models.ManyToManyField('Category')
    title = models.CharField(max_length=100, verbose_name='Recipe|title')
    summary = models.CharField(max_length=500, blank=True, verbose_name='Recipe|summary')
    description = models.TextField(blank=True, verbose_name='Recipe|description')
    sources =  models.ManyToManyField('Source',blank=True)
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    serving = models.IntegerField(blank=True, null=True)
    rating_value = models.IntegerField(null=True, blank=True)
    rating_count = models.IntegerField(null=True, blank=True)
    slug = models.SlugField(unique=True, max_length=50)
    prep_time = models.CharField(max_length=100, blank=True)  
    cook_time = models.CharField(max_length=100, blank=True)  
    search_vector = SearchVectorField(null=True)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)


    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Recipe'
        indexes = [
            GinIndex(fields=['search_vector']),
            Index(fields=['slug']),
            Index(fields=['rating_value']),
            Index(fields=['rating_count']),
        ]

    def __str__(self):
        return self.title

class RecipeIngredient(models.Model):
    recipe = models.ForeignKey('Recipe', on_delete=models.CASCADE, related_name='recipes', related_query_name='recipe')
    name = models.CharField(max_length=220)   
    quantity = models.CharField(max_length=50, blank=True, null=True)
    quantity_as_float = models.FloatField(blank=True, null=True)
    unit = models.CharField(max_length=50,validators=[validate_unit_of_measure])       
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name
        

    def save(self, *args, **kwargs):
        qty = self.quantity
        qty_as_float, qty_as_float_success = number_str_to_float(qty)
        if qty_as_float_success:
            self.quantity_as_float = qty_as_float
        else:
            self.quantity_as_float = None
        super().save(*args, **kwargs)


class Instruction(models.Model):
    recipe = models.ForeignKey('Recipe', on_delete=models.CASCADE)
    step_number = models.IntegerField(blank=True, null=True)
    method = models.TextField(blank=True, verbose_name='Recipe|method')

class RecipeImage(models.Model):
    recipe = models.ForeignKey('Recipe', on_delete=models.CASCADE)
    image = models.ImageField( 
        verbose_name= "image",
        help_text= "Upload a product image",
        upload_to="images/",
        default="images/default.png"
    ) 
    caption = models.CharField(
        max_length=200, 
        verbose_name= 'Photo|caption',
        null=True,
        blank=True
    )
    default = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Recipe Image'


class RecipeReview(models.Model):
    recipe = models.ForeignKey('Recipe', related_name='reviews', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='reviews',on_delete=models.CASCADE)
    content = models.TextField(blank=True, null=True)
    stars = models.IntegerField()
    date_added = models.DateField(auto_now_add=True)
