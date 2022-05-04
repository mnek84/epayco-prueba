import {errorResponse, successResponse, successResponseWithData} from "../utils/ApiResponse";

import {soap} from 'strong-soap';

const url = './src/epayco.wsdl';


var options = {};


module.exports = {
    checkBalance: (req, res, next) => {

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

                    successResponseWithData(res,checkResult.message_error, balance)
                }else{
                    errorResponse(res,checkResult.cod_error,checkResult.message_error);
                }

            });
        });
    },
    hello: (req, res, next) => {

        var options = {};
        soap.createClient(url, options, function(err, client) {
            if (err)
            {
                console.log(err);
                return err;
            }

            const requestArgs = {
                'document':'30796419',
                'mobile':'+5491162192907'
            };

            client.checkBalance(requestArgs, function(err, result, envelope, soapHeader) {

                var checkResult = result.checkBalanceResult;
                successResponseWithData(res,checkResult.message_error, checkResult.data)

            });
        });


    }
}
