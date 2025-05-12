class ApiError extends Error{
    constructor(statusCode,
        message = 'Something went wrong',
        errors = [],
        statck = ""

    ) {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.errors = errors
        this.message = message
        this.success = false
    
        statck ?
            this.stack = statck :
            Error.captureStackTrace(this, this.constructor)
    }
}
export { ApiError };