const { Schema, model } = require('mongoose')
const { regex,formatToMoney } = require('../helpers')

let customerDetailSchema = schema({
	customerId : {
		type : Number,
		ref : 'customer'
	}
	accountInformation : {
		accountHolderName : String,
		accountNumber : {
			type : String,
			unique : true,
			requried : true,
			validate : {
				validator: function(value){
					return (regex.accountNumber).test(value)
				},
				message : 'Invalid account number'
			}
		}
	},
	personalInformation : { 
		dob: {
			type : Date,
		},
		pan : {
			type : String,
			validate : {
				validator: function(value){
					return (regex.pan).test(value)
				},
				message : 'Invalid pan'
			}
		},
		aadhar : {
			type : String,
			validate : {
				validator: function(value){
					return (regex.aadhar).test(value)
				},
				message : 'Invalid aadhar'
			}
		},
		permanentHomeAddress : {
			type : String,
			trim : true
		},
		HomeMobileNumber : {
			type : Number,
			trim : true,
			min:10,
			max:10
		},
		zipCode : {
			type : Number,
			min:6,
			max:6
		},
		nationality : {
			type : String,
		},
		martialStatus : {
			type : Number,
			enum : [
				0, //Single
				1, //Engaged
				2, //married
				3 //divoced
			]
		}
	},
	familymembers : [{
		name : {
			type : String,
			trim : true
		},
		relation : {
			type : String,
			enum : [
				0, //father
				1, //mother
				2, //wife
				3, //child
			]
		},
		age : {
			type : String,
			validate : {
				validation: function(val){
					let value = parseInt(val)
					return typeof value === 'number'
				},
				message : 'Invalid age'
			},
			set : function(value){
				return `${val} years old`
			}
		},
		contactNumber : {
			type : String,
			min:10,
			max:10
		}
	}],
	workAndFinanceInformation : {
		typeOfEmployment : {
			type : Number,
			enum : [
				0, //Government
				1, //Private
				2, //Self-employee
				3, //Retired
				4 //UnEmployee
			]
			default : 0
		},
		officeName : {
			type : String
		},
		officePhoneNumber : {
			type : number,
			min: 10,
			max:10
		},
		AnnualIncome : {
			type : String,
			validate : function(val){
					let value = parseInt(val)
					return typeof value === 'number'
			},
			set : function(val){
				return `₹ ${formatToMoney(val)}`
			}
		},
		rank : {
			type : Number,
			enum : [
				0, //Employee
				1, //Supervisor
				2, //Asst.Manager
				3, //Manager
				4, //CEO/Chariman/Director
				5 //Owner
			]
		},
		lengthOfService : {
			type : String,
			validate : {
				validation: function(val){
					let value = parseInt(val)
					return typeof value === 'number'
				},
				message : 'Invalid length of service'
			},
			set : function(value){
				return `${val} years`
			}
		}
	},
})

module.exports = new model('customerDetail', customerDetailSchema)