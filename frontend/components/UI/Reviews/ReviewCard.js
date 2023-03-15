import ConfirmDelete from '@components/Form/ConfirmDelete';
import Rating from '@components/UI/Reviews/Rate';
import { images } from '@utils/constants';
import formatDate from '@utils/formatdate';
import { useState } from 'react';
import { FiDelete } from 'react-icons/fi';
import Img from '../Image';

function ReviewCard({
	id,
	slug,
	user,
	rating,
	date_added,
	title,
	content,
	avatar,
	hasEdit,
	handleDelete,
}) {
	const [showConfirmDeleteteReview, setShowConfirmDeleteReview] =
		useState(false);
	const onDelete = async () => {
		await handleDelete(slug, id);
		setShowConfirmDeleteReview(false);
	};
	return (
		<div className="py-5 border-b">
			<ConfirmDelete
				handleDelete={onDelete}
				showConfirm={showConfirmDeleteteReview}
				handleCloseConfirm={() => setShowConfirmDeleteReview(false)}
			/>
			<div className="flex flex-col gap-4 ">
				<div className="flex justify-between items-center">
					<div className="flex gap-2">
						<Img
							src={avatar || images.defaultAvatar}
							alt="avatar"
							className="h-12 w-12 rounded-full overflow-hidden border border-border"
							cover
						/>
						<div className="relative -top-[3px]">
							<span className="font-medium text-base leading-0">
								{user}
							</span>
							<Rating number={rating} />
						</div>
					</div>
					<div className="flex flex-col items-end">
						<span className="text-sm ">
							{formatDate(date_added)}
						</span>
						{hasEdit && (
							<button
								className="text-xl text-red"
								onClick={() => setShowConfirmDeleteReview(true)}
							>
								<FiDelete />
							</button>
						)}
					</div>
				</div>
				<div className="flex-1">
					<span className="first-letter:capitalize block font-medium text-black">
						{title}
					</span>
					<p className="first-letter:uppercase">{content}</p>
				</div>
			</div>
		</div>
	);
}

export default ReviewCard;
