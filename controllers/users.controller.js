const userService = require('../services/user.service');

class UsersController {

	getUsers = async (req, res) => {
			const users = await userService.getAllUsers();
			return res.OK({users});
	}
}

module.exports = new UsersController();

