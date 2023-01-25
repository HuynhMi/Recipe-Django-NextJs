# Generated by Django 4.1.5 on 2023-01-20 16:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipeingredient',
            name='quantity_as_float',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='recipe', to='recipes.category'),
        ),
    ]
