const ManagementModel = require('../models/management')
const { handleResponse } = require('../middleware')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const _ = require('lodash')
const config = require('config')
const LoanModel = require('../models/loan')

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

			let registeredUser = await ManagementModel.findOne(findQuery)

			if(registeredUser)
				throw Error('MANAGEMENT_SIGNUP_USER_ALREADY_REGISTERED')

			let data = await new ManagementModel(req.body).save()

			return handleResponse(
				res,
				200,
				data,
				"MANAGEMENT_SIGNUP_SUCCESSFULL"
			)
		}
		catch(err){
			return handleResponse(res,400,err,err.message)
		}
	},
	signIn : async (req,res) => {

		let { email,password } = req.body

		try{

			let user = await ManagementModel.findOne({ email })

			if(!user)
				throw Error("MANAGEMENT_SIGNIN_UNAUTHORIZED")

			if(!bcrypt.compareSync(password,user.password))

				throw Error("MANAGEMENT_SIGNIN_UNAUTHORIZED")

			let tokenData = _.pick(user,['email','mobileNumber','userName','role','_id'])

			tokenData['token'] = jwt.sign(tokenData,config.JWT_SECRET)

			return handleResponse(res,200,tokenData,"MANAGEMENT_SIGNIN_SUCCESSFULL")
		}
		catch(err){
			return handleResponse(res,401,err,err.message)
		}
	},
	getLoanListForRelationshipManager : async (req,res) => {
		let { _id } = req.user

		try{
			let list = await LoanModel.find({ 
				'loan.relationshipManager' : _id
			})

			return handleResponse(res,200,list,"MANAGEMENT_RM_GETLOANLIST_SUCCESSFULL")
		}
		catch(err){
			return handleResponse(res,401,err,err.message)
		}
	},
	updateRelationshipManagerLoanStatus : async (req,res) => {
		try{

			let { customerId } = req.params

			let { status,message } = req.body

			let findQuery = {
				customerId
			}

			let updateQuery = {
				'loan.relationshipManagerStatus' : status,
				'loan.message' : message
			}

			let option = {
				new : true
			}

			let updatedLoan = await LoanModel.findOneAndUpdate(findQuery,updateQuery,option)

			return handleResponse(res,200,updatedLoan,'MANAGEMENT_UPDATE_LOAN_STATUS')
		}
		catch(err){
			return handleResponse(res,400,err,err.message)
		}
	},
	updateManagerLoanStatus : async (req,res) => {
		try{

			let { customerId } = req.params

			let { status,message } = req.body

			let findQuery = {
				customerId
			}

			let updateQuery = {
				'loan.managerStatus' : status,
				'loan.message' : message
			}

			let option = {
				new : true
			}

			let updatedLoan = await LoanModel.findOneAndUpdate(findQuery,updateQuery,option)

			return handleResponse(res,200,updatedLoan,'MANAGEMENT_UPDATE_LOAN_STATUS')
		}
		catch(err){
			return handleResponse(res,400,err,err.message)
		}
	}
}