import router from 'express'

import userController from "../controller/UserController";

const { body } = require('express-validator');
const api = router();


api.get('/hello', userController.hello);
api.post('/balance', userController.checkBalance);
api.post('/user/create', userController.userCreate);

/*api.get('/get-city-list',  cityController.getCitiesByStateId);

api.post('/authenticate',userController.login)
api.get('/verify', userController.verify) //Solo Verifica si es valido

api.get('/user', authenticateJWT,userController.getUser);
api.post('/users/refresh-token', userController.refreshToken)
api.post('/users/revoke-token', userController.revokeToken)*/

export default api;
