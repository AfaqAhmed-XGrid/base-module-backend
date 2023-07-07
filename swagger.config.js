// npm modules
const swaggerAutogen = require( 'swagger-autogen' )();

// App dependencies
const outputFile = './swagger.json';
const endpointsFiles = [ './modules/auth/auth.route.js' ];

const doc = {
  'info': {
    'version': '1.0.0',
    'title': 'My User Project CRUD',
    'description': 'My User Project Application API',
    'license': {
      'name': 'MIT',
      'url': 'https://opensource.org/licenses/MIT',
    },
  },
  'host': 'localhost:4000',
  'basePath': '/api/user',
};

swaggerAutogen( outputFile, endpointsFiles, doc );
