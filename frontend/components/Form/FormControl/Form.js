import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

function Form({ children, onSubmit }) {
	const {
		handleSubmit,
		formState: { errors, isSubmitSuccessful, isSubmitting },
		reset,
		...rest
	} = useForm();

	useEffect(() => {
		reset();
	}, [isSubmitSuccessful]);

	return (
		<FormProvider
			errors={errors}
			isSubmitting={isSubmitting}
			reset={reset}
			{...rest}
		>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-4 max-md:flex-1"
				noValidate={true}
			>
				{typeof children === 'function'
					? children({ errors, isSubmitting, reset, ...rest })
					: children}
			</form>
		</FormProvider>
	);
}

export default Form;
