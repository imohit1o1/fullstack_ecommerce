class ApiError extends Error {
    constructor(statusCode, message = "Api connection error", errors = []) {
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.success = false;
        this.errors = errors
    }
}

export { ApiError };