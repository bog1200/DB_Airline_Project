import express from 'express';
const router = express.Router();
//swagger error schema
/**
 * @openapi
 * components:
 *  schemas:
 *    Error:
 *      type: object
 *      required:
 *      - message
 *      properties:
 *          message:
 *              type: string
 *              description: The error message
 *
 *
 */
//generate swagger.json
import swaggerJSDoc from 'swagger-jsdoc';
const options = {
    definition: {
        openapi: '3.0.3',
        failOnErrors: true,
        info: {
            title: 'DB Airlines API',
            version: '1',
            description: 'This is the documentation for the API',
        },
        servers: [
            {
                url: 'https://dbairlines.romail.app/api/v1',
                description: 'Production server',
            },
            {
                url: 'http://localhost:6060/api/v1',
                description: 'Local server',

            }
        ],
    },
    apis: ['./source/v1/**/*.ts'],
};
const specs = swaggerJSDoc(options);
console.log(specs);
// @ts-ignore
router.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
});

//create swagger documentation
import swaggerUi from 'swagger-ui-express';
//create swagger documentation
router.use('/', swaggerUi.serve, swaggerUi.setup(specs));
export = router;