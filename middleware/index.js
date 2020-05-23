const { formatResponse } = require('../helpers')
const { validationResult } = require('express-validator')
const messages = require('../messages')

const handleFieldError = (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const firstError = errors.array()[0].msg;
        return res.status(400).json(
                    formatResponse(400, null, firstError)
                );
    }
    next()
}

const handleResponse = (res,status,data=null,messageType) => {
    let message = messages[messageType]
    if(message){
        res.status(status).json(
            formatResponse(
                status,
                data,
                message
            )
        )
    }else{
        res.status(500).json(
            formatResponse(
                500,
                null,
                messages.TECHNICAL_ERROR
            )
            
        )
    }
}

module.exports = {
	handleFieldError,
    handleResponse
}