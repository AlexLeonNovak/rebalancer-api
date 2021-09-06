const authService = require('../services/auth.service');

class AuthController {
	#cookieConfig = {
		maxAge: 30 * 24 * 60 * 60 * 1000,
		httpOnly: true,
		signed: true
	};

	register = async (req, res) => {
		const userData = await authService.registration(req.body);

		res.cookie('refreshToken', userData.refreshToken, this.#cookieConfig);
		res.cookie('deviceId', userData.deviceId, this.#cookieConfig);

		return res.Created({...userData});
	}

	login = async (req, res) => {
		const {email, password} = req.body;
		const {deviceId} = req.signedCookies;
		const userData = await authService.login(email, password, deviceId);

		res.cookie('refreshToken', userData.refreshToken, this.#cookieConfig);
		res.cookie('deviceId', userData.deviceId, this.#cookieConfig);

		return res.OK({...userData});
	}

	logout = async (req, res) => {
		const {refreshToken, deviceId} = req.signedCookies;
		await authService.logout(refreshToken, deviceId);
		res.clearCookie('refreshToken');
		res.clearCookie('deviceId');

		return res.NoContent();
	}

	refresh = async (req, res) => {
		const {refreshToken, deviceId} = req.signedCookies;
		const userData = await authService.refresh(refreshToken, deviceId);

		res.cookie('refreshToken', userData.refreshToken, this.#cookieConfig);
		res.cookie('deviceId', userData.deviceId, this.#cookieConfig);

		return res.OK({...userData});
	}

	activate = async (req, res) => {
		const {token} = req.params;
		console.log(token)
		const userData = await authService.activate(token);
		return res.OK({...userData});
	}
}

module.exports = new AuthController();
