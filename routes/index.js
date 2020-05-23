const customerRoutes = require('./customer')

module.exports = (app) => {
	app.use('/customer',customerRoutes)
}