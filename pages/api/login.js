import { setCookie } from 'cookies-next';
import md5 from 'md5';

export default function handler(req, res) {
	if (req.method === 'POST') {
		const { password } = req.body;

		if (md5(password) === process.env.FICUS_PASSWORD) {

			setCookie('auth', 'true', {
				req,
				res,
				httpOnly: true,
				secure: process.env.NODE_ENV !== 'development',
				maxAge: 60 * 60 * 24 * 7, // 1 week
				path: '/',
			});

			res.status(200).json({ message: 'Login successful' });
		} else {
			res.status(401).json({ message: 'Invalid password' });
		}
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}

