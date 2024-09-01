const AppErrors = require('../utils/appErrors')
exports.AppError = function(originalError,errType) {
    return (req,res,next)=>{
        if (errType === 'ValidationError') {
            const error = new AppErrors('One or more validation errors occurred', 'ValidationError', 400);
            return res.status(error.statusCode).json({
              error: {
                status: "fail",
                errors: originalError.errors,
                message: error.message
              }
            });
          }
        else{
            return res.status(500).json({
                status:'fail',
                message:'Internal server error',
                err: originalError
            })
        }
          next()
    }
    
    
}