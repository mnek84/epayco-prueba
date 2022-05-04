import express from 'express';
const router = express.Router();
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocument = YAML.load('./swagger.yaml');

var options = {
    customCss: '.swagger-ui .topbar { display: none }',
    customCssUrl: '//cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-monokai.css'
};

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument,options));

module.exports = router;
