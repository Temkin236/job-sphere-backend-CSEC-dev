class ApiResponse {
    static success(res, message, data = null, statusCode = 200) {
      res.status(statusCode).json({ success: true, message, data });
    }
  
    static error(res, message, error, statusCode = 500) {
      res.status(statusCode).json({ success: false, message, error: error.message });
    }
  }
  
  module.exports = ApiResponse;