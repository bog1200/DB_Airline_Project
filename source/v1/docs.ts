import express from 'express';
const router = express.Router();
//swagger error schema
/**
 * @openapi
 * components:
 *  schemas:
 *    Error:
 *      type: object
 *      properties:
 *          message:
 *              type: string
 *              description: The error message
 *              example: 'Not found'
 *              required: true
 *              nullable: false
 *              default: 'Not found'
 *
 */
//generate swagger.json
import swaggerJSDoc from 'swagger-jsdoc';
const options = {
    definition: {
        openapi: '3.0.2',
        failOnErrors: true,
        info: {
            title: 'DB Airlines API',
            version: '0.0.1',
            description: 'This is the documentation for the API',
        },
        servers: [
            {
                url: 'https://dbairlines.romail.app',
                description: 'Production server',
                enabled: false,
            },
            {
                url: 'http://localhost:6060/',
                description: 'Local server',

            },
            {
                url: 'https://dbairlines.romail.app/ch101',
                description: 'Chrisharris101 server',
            },
            {
                url: 'https://dbairlines.romail.app/xcr',
                description: 'XCriwn server',
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