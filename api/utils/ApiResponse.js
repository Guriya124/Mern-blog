export const ApiResponse = (res, statusCode, message = "Success", data) => {
    res.status(statusCode).json({           
        statusCode: statusCode,
        message: message,
        data: data,
        success: statusCode < 400
    });
};