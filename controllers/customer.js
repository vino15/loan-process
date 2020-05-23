const CustomerModel = require('../models/customer')
const { handleResponse } = require('../middleware')

module.exports = {
	signUp : async (req,res) => {

		try{

			let findQuery = { 
				$or : [
					{
						email:req.body.email
					},
					{
						mobileNumber : req.body.mobileNumber
					}
				]
				
			}

			let registeredUser = await CustomerModel.findOne(findQuery)

			if(registeredUser)
				throw Error('CUSTOMER_SIGNUP_USER_ALREADY_REGISTERED')

			let data = await new CustomerModel(req.body).save()

			return handleResponse(
				res,
				200,
				data,
				"CUSTOMER_SIGNUP_SUCCESSFULL"
			)
		}
		catch(err){
			return handleResponse(res,400,err,err.message)
		}
	}
}