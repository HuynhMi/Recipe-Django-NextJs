import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { images } from '@utils/constants';
import { Form, InputField } from './FormControl';
import Img from '@components/UI/Image';
import Button from '@components/UI/Button';
import { useAuthContext } from '@context/auth-context';
import Loader from '@components/UI/Loader';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { TitlePrimary } from '@components/UI/Title';

function SignUpForm({ onSubmit }) {
	const { errors, setErrors, registerSuccess } = useAuthContext();
	const {
		handleSubmit,
		register,
		formState: { errors: formError, isSubmitting, isSubmitSuccessful },
		setError,
		reset,
	} = useForm();
	useEffect(() => {
		errors?.register?.username &&
			setError('register.username', {
				type: 'custom',
				message: errors.register.username,
			});

		errors?.register?.email &&
			setError('register.email', {
				type: 'custom',
				message: errors.register.email,
			});

		errors?.register?.password &&
			setError('register.password', {
				type: 'custom',
				message: errors.register.password,
			});
		errors?.register?.confirm_password &&
			setError('register.confirm_password', {
				type: 'custom',
				message: errors.register.confirm_password,
			});
	}, [errors]);

	useEffect(() => {
		setErrors(null);
		reset();
	}, []);

	return (
		<div className="bg-white  rounded-xl pt-6 pb-9 md:px-8 px-4 border my-10 md:shadow-xl">
			<div className="flex justify-center items-center ">
				<TitlePrimary title="Register" />
				<Img
					alt="login_icon"
					src={images.icon1}
					className="md:w-20 md:h-20 w-20 h-20"
				/>
			</div>
			<p className="text-center mb-10">Welcome. We are glad you are here.</p>
			<Form onSubmit={handleSubmit((data) => onSubmit(data.register))}>
				<InputField
					name="register.username"
					type="text"
					placeholder="Enter your name"
					register={register}
					error={formError?.register?.username}
					required
				/>

				<InputField
					name="register.first_name"
					type="text"
					placeholder="Enter your first name"
					register={register}
					error={formError?.register?.first_name}
				/>

				<InputField
					name="register.last_name"
					type="text"
					placeholder="Enter your last name"
					register={register}
					error={formError?.register?.last_name}
				/>

				<InputField
					name="register.email"
					type="email"
					placeholder="Enter your email"
					register={register}
					error={formError?.register?.email}
					required
					icon={<MdEmail />}
				/>

				<InputField
					name="register.password"
					type="password"
					placeholder="Enter your password"
					register={register}
					error={formError?.register?.password}
					required
					icon={<RiLockPasswordFill />}
				/>

				<InputField
					name="register.confirm_password"
					type="password"
					placeholder="Confirm password"
					register={register}
					error={formError?.register?.confirm_password}
					required
					icon={<RiLockPasswordFill />}
				/>

				<Button
					className="primary lg w-full mt-5"
					type="submit"
					disabled={isSubmitting}
				>
					{isSubmitting && <Loader type="submitting" />}
					create account
				</Button>

				<p className="text-center mt-4">
					Have an account?
					<Link
						href="/login"
						className="ml-2 underline font-semibold text-primary "
					>
						Login
					</Link>
				</p>
				<span className="text-base text-center px-12">
					By clicking "Create Account", I consent to
					<Link href="/" className="underline text-primary ml-1">
						the Terms of Services
					</Link>{' '}
					and{' '}
					<Link href="/" className="underline text-primary">
						Privacy Policy
					</Link>
					.
				</span>
			</Form>
		</div>
	);
}

export default SignUpForm;
