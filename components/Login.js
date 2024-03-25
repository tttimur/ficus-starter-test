
import { useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';

export default function Login() {
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		const response = await fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ password }),
		});

		if (response.ok) {
			router.push('/');
		} else {
			const result = await response.json();
			setError(result.message);
		}
	};

	return (
		<div className="flex justify-center items-center h-screen">
			<div className='relative'>
				<form onSubmit={handleSubmit} className="flex flex-wrap">
					<div>
						<input
							placeholder="Password"
							type="password"
							id="password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							className="shadow appearance-none w-full py-2 px-3 border border-black text-xs leading-tight"
						/>
					</div>
					<button
						type="submit"
						className="absolute top-1/2 right-2 transform -translate-y-1/2 text-xs py-1  z-10 bg-white"
					>
						Sign In
					</button>

				</form>
				{error && (
					<p className="text-red-500 text-xs absolute -bottom-6 left-0">{error}</p>
				)}
			</div>
		</div>
	);
};