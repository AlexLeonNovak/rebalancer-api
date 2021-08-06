
class IndexController {
	index(req, res, next) {
		return res.json({message: 'REST API rebalancer'})
	}

	notFound(req, res, next) {
		return res.status(404).json({
			message: 'Page not found'
		})
	}
}

module.exports = new IndexController()
