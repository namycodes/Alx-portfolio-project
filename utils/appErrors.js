class AppErrors extends Error {
    constructor(message,errName, statusCode){
        super(message)
        this.errName = errName
        this.statusCode = statusCode || 500
        // this.res = res

        Error.captureStackTrace(this, this.constructor)
    }

}

module.exports = AppErrors