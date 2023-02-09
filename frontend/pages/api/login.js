import api from '@services/axios';
import cookie from 'cookie';

const handler = async (req, res) => {
	if (req.method === 'POST') {
		const { email, password, remember } = req.body;
		try {
			const response = await api.post('/user/login/', {
				password,
				email,
			});

			const tokenAccess = response.data.token.access;
			if (tokenAccess && remember) {
				//save token
				const A_DAY = 60 * 60 * 3;
				res.setHeader(
					'Set-Cookie',
					cookie.serialize('tokenAccess', tokenAccess, {
						httpOnly: true,
						secure: process.env.NODE_ENV !== 'development',
						maxAge: A_DAY,
						sameSite: 'strict',
						path: '/',
					})
				);
			}

			return res.status(200).json({
				success: true,
				user: {
					username: response.data.username,
					email: response.data.email,
					id: response.data.id,
				},
			});
		} catch (error) {
			return res.status(error.response.status).json({
				error: error.response.data,
			});
		}
	} else {
		return res
			.status(405)
			.json({ error: `Method "${req.method}" not allowed.` });
	}
};

export default handler;
