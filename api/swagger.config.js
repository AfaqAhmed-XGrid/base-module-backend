/*
Copyright (c) 2023, Xgrid Inc, http://xgrid.co

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// npm modules
const swaggerAutogen = require( 'swagger-autogen' )();

// App dependencies
const outputFile = './swagger.json';
const endpointsFiles = ['./modules/auth/auth.route.js'];

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
