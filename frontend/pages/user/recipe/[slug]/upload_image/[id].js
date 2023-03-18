import { useRouter } from 'next/router';

import { useAuthContext } from '@context/auth-context';
import api from '@services/axios';
import { ENDPOINT_RECIPE_DETAIL } from '@utils/constants';

import PrivateRoutes from '@components/Layouts/PrivateRoutes';
import UploadPhoto from '@components/Form/RecipeForm/UploadPhoto';
import { TitlePrimary } from '@components/UI/Title';
import toastMessage from '@utils/toastMessage';

function UploadImagePage() {
	const { configAuth } = useAuthContext();
	const router = useRouter();
	const {
		query: { slug, id },
	} = router;

	const onUploadPhoto = async (form) => {
		try {
			await api.patch(
				`${ENDPOINT_RECIPE_DETAIL}${slug}/`,
				form,
				configAuth()
			);
			toastMessage({
				message: 'Photos successfully changed',
			});
			router.push(`/user/recipe/${slug}`);
		} catch {}
	};
	return (
		<div className="container py-14">
			<TitlePrimary
				title="Manage photo"
				center
			/>

			<UploadPhoto
				onSubmit={onUploadPhoto}
				recipe={id}
			/>
		</div>
	);
}

export default UploadImagePage;

UploadImagePage.getLayout = (page) => <PrivateRoutes>{page}</PrivateRoutes>;
