const regex = {
	email : /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
	password : /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/,
	pan : /[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
	aadhar : /^\d{4}\s\d{4}\s\d{4}$/,
	accountNumber : /^\d{9,18}$/
}

const formatToMoney = val => val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')

function formatResponse(status,data,message=''){
	return {
		status,
		data,
		message
	}
}

module.exports = {
	regex,
	formatToMoney,
	formatResponse
}