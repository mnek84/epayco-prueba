exports.successResponse = function (res, msg) {
    var data = {
        success: 1,
        error_code:0,
        message_error: msg
    };
    return res.status(200).json(data);
};

exports.successResponseWithData = function (res, msg, data) {
    var resData = {
        success: 1,
        error_code:0,
        message_error: msg,
        data: data
    };
    return res.status(200).json(resData);
};

exports.errorResponse = function (res, errCode,msg) {
    var data = {
        success: 0,
        error_code:errCode,
        message_error: msg,
    };
    return res.status(404).json(data);
};

exports.notFoundResponse = function (res, msg) {
    var data = {
        success: 0,
        error_code:0,
        message_error: msg,
    };
    return res.status(404).json(data);
};


exports.validationErrorWithData = function (res, msg, data) {
    var resData = {
        success: 0,
        error_code:0,
        message_error: msg,
        data: data
    };
    return res.status(400).json(resData);
};

exports.unauthorizedResponse = function (res, msg) {
    var data = {
        success: 0,
        error_code:0,
        message_error: msg,
    };
    return res.status(401).json(data);
};

exports.deniedResponse = function (res, msg) {
    var data = {
        success: 0,
        error_code:0,
        message_error: msg,
    };
    return res.status(403).json(data);
};

