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

// Import scss
import './assets/main.css';
import './styles/global.styles.scss';
import 'quasar/dist/quasar.sass';

// Import Packages
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Quasar } from 'quasar';

// Import components
import App from './App.vue';

// Import app routes
import router from './router';

// Import quasar config options
import quasarUserOptions from './quasar-user-options';

const app = createApp(App).use(Quasar, quasarUserOptions);

app.use(createPinia());
app.use(router);

app.mount('#app');
