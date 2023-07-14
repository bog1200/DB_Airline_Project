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
const createSwaggerSpec = (version: number): object => {
    return {
        definition: {
            openapi: '3.0.3',
            failOnErrors: true,
            info: {
                title: 'DB Airlines API',
                version: version,
                description: `This is the documentation for the DB Airlines API (version ${version}).`,
            },
            servers: [
                {
                    url: `https://dbairlines.romail.app/api/v${version}`,
                    description: 'Production server',
                },
                {
                    url: `http://localhost:6060/api/v${version}`,
                    description: 'Local server',

                }
            ],
        },
        apis: [`./v${version}/**/*.ts`, `./v${version}/**/*.js`]
    };
}

const specs: object[] = []
specs.push(swaggerJSDoc(createSwaggerSpec(1)));
specs.push(swaggerJSDoc(createSwaggerSpec(2)));

router.get('/v1/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs[0]);
});
router.get('/v2/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs[1]);
});

//create swagger documentation
import swaggerUi from 'swagger-ui-express';
//create swagger documentation
router.use('/v1',swaggerUi.serveFiles(specs[0]), swaggerUi.setup(specs[0]));
router.use('/v2',swaggerUi.serveFiles(specs[1]), swaggerUi.setup(specs[1]));
export = router;