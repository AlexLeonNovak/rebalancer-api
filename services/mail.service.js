const nodemailer = require('nodemailer');

class MailService {

	constructor() {
		const {SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD} = process.env;
		this.transporter = nodemailer.createTransport({
			hostname: SMTP_HOST,
			port: SMTP_PORT,
			secure: false,
			auth: {
				user: SMTP_USER,
				password: SMTP_PASSWORD
			}
		})
	}
	async sendActivationMail(email, link) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to: email,
			subject: 'Activation account on Rebalancer',
			text: '',
			html: `
				<div>
					<h1>For activation follow link:</h1>
					<a href="${link}">${link}</a>
				</div>
			`
		})
	}
}

module.exports = new MailService();
