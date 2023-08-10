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

// Import packages
import constants from '../app.constants';
import { createRouter, createWebHistory } from 'vue-router';

// Import constants

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: constants.pages.signIn.link,
      name: constants.pages.signIn.name,
      component: () => import('../views/SignIn.vue')
    },
    {
      path: constants.pages.signUp.link,
      name: constants.pages.signUp.name,
      component: () => import('../views/signUp.vue')
    },
    {
      path: constants.pages.signIn.link,
      name: constants.pages.signIn.name,
      component: () => import('../views/SignIn.vue')
    },
    {
      path: constants.pages.callBack.link,
      name: constants.pages.callBack.name,
      component: () => import('../views/CallBack.vue')
    },
  ]
});

router.beforeEach((to) => {
  const isAuthenticated = localStorage.getItem(constants.localStorage.userToken);

  if( !isAuthenticated && to.name !== constants.pages.signIn.name && to.name !== constants.pages.signUp.name && to.name !== constants.pages.callBack.name) {
    return constants.pages.signIn.link;
  }
});

export default router;
