import {errorResponse, successResponse, successResponseWithData} from "../utils/ApiResponse";

import {soap} from 'strong-soap';

const url = './src/epayco.wsdl';

var options = {};

module.exports = {
    userCreate: (req, res, next) => {
        var options = {};

        soap.createClient(url, options, function(err, client) {
            if (err)
            {
                console.log(err);
                errorResponse(res,99,"No pudimos conectarnos al WSDL");
                return err;
            }


            const requestArgs = {
                'document':req.body.document,
                'mobile':req.body.mobile,
                'email':req.body.email,
                'name':req.body.name,
            };

            client.register(requestArgs, function(err, result, envelope, soapHeader) {
                var checkResult = result.registerResult;

                if (checkResult.success)
                {
                    return successResponse(res,"");
                }else{
                    return errorResponse(res,checkResult.cod_error,checkResult.message_error);
                }

            });
        });
    },
    checkBalance: (req, res, next) => {

        var options = {};

        soap.createClient(url, options, function(err, client) {
            if (err)
            {
                console.log(err);
                return errorResponse(res,99,"No pudimos conectarnos al WSDL");
            }


            const requestArgs = {
                'document':req.body.document,
                'mobile':req.body.mobile
            };

            client.checkBalance(requestArgs, function(err, result, envelope, soapHeader) {
                var checkResult = result.checkBalanceResult;
                if (checkResult.success)
                {
                    const defaultItem = checkResult.data?.item;
                    const balance = {
                        'current_balance':parseFloat(defaultItem.value)
                    };

                    return successResponseWithData(res,checkResult.message_error, balance)
                }else{
                    return errorResponse(res,checkResult.cod_error,checkResult.message_error);
                }

            });
        });
    },
    chargeBalance: (req, res, next) => {
        var options = {};
        soap.createClient(url, options, function(err, client) {
            if (err)
            {
                console.log(err);
                return errorResponse(res,99,"No pudimos conectarnos al WSDL");
            }

            const requestArgs = {
                'document':req.body.document,
                'mobile':req.body.mobile,
                'value':req.body.value
            };

            client.charge(requestArgs, function(err, result, envelope, soapHeader) {
                console.log(result);
                var checkResult = result.chargeResult;
                return successResponseWithData(res,checkResult.message_error, checkResult.data)

            });
        });
    },


    createPaymentIntent: (req, res, next) => {
        var options = {};
        soap.createClient(url, options, function(err, client) {
            if (err)
            {
                console.log(err);
                return errorResponse(res,99,"No pudimos conectarnos al WSDL");
            }

            const requestArgs = {
                'document':req.body.document,
                'mobile':req.body.mobile,
                'description':req.body.description,
                'price':req.body.price
            };

            client.createPaymentIntent(requestArgs, function(err, result, envelope, soapHeader) {
                console.log(result);
                var checkResult = result.createPaymentIntentResult;
                return successResponseWithData(res,checkResult.message_error, checkResult.data)

            });
        });
    },
    confirmPayment: (req, res, next) => {
        var options = {};
        soap.createClient(url, options, function(err, client) {
            if (err)
            {
                console.log(err);
                return errorResponse(res,99,"No pudimos conectarnos al WSDL");
            }

            const requestArgs = {
                'document':req.body.document,
                'session':req.body.session,
                'token':req.body.token
            };

            client.confirmatePayment(requestArgs, function(err, result, envelope, soapHeader) {
                console.log(result);
                var checkResult = result.confirmatePaymentResult;
                return successResponseWithData(res,checkResult.message_error, checkResult.data)

            });
        });
    },

    hello: (req, res, next) => {

        var options = {};
        soap.createClient(url, options, function(err, client) {
            if (err)
            {
                console.log(err);
                return errorResponse(res,99,"No pudimos conectarnos al WSDL");
            }

            const requestArgs = {
                'document':'30796419',
                'mobile':'+5491162192907'
            };

            client.checkBalance(requestArgs, function(err, result, envelope, soapHeader) {

                var checkResult = result.checkBalanceResult;
                return successResponseWithData(res,checkResult.message_error, checkResult.data)

            });
        });


    }
}
