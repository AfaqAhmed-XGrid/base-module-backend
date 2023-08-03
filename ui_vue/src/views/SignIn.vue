<!-- 
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
-->

<template>
  <div class="row justify-between minH-fullview">
    <div class="col-md-5 col-0 bg-image-one text-white column justify-center">
      <div class="dark-opaque-bg"></div>
      <div class="q-mx-xl">
        <h4 class="heading-one text-center text-white">
          Discover CineInfo - Your Ultimate Movie Dashboard!
        </h4>
        <p class="sub-heading-one text-center text-light-gray" >
          Authenticate, explore movies in tables, and visualize data with dynamic charts. Your go-to
          app for cinematic insights. Sign in now and dive into the world of movies like never
          before!
        </p>
      </div>
    </div>
    <div class="col-md-7 col column justify-center items-center">
      <div class="maxH-fullview px-1rem w-full maxW-32rem">
        <div class="column q-mb-lg">
          <h4 class="heading-two">CineINFO</h4>
          <p class="sub-heading-two text-accent">Welcome back,</p>
          <p class="m-0 text-black">
            Don't have an account yet? <RouterLink to="/sign-up">Sign up now!</RouterLink>
          </p>
        </div>
        <div class="row justify-between gap-1rem ">
          <q-btn
            data-cy="googleAuth"
            label="Google"
            outline
            color="primary"
            push
            ripple
            :icon="`img:` + google"
            type="button"
            :href="constants.httpRequests.apiUrl + constants.socialAuthorization.google"
            class="col"
          />
          <q-btn
            data-cy="githubAuth"
            label="Github"
            outline
            color="accent"
            push
            ripple
            :icon="`img:` + github"
            type="button"
            :href="constants.httpRequests.apiUrl + constants.socialAuthorization.github"
            class="col"
          />
        </div>
        <p class="my-1rem">Or signin with regular account</p>
        <q-form class="q-gutter-md column" @submit.prevent="onSignIn">
          <q-input
            data-cy="email"
            outlined
            v-model="formData.email"
            label="Email Address"
            :rules="formValidation.emailRules"
          >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
          <q-input
            data-cy="password"
            outlined
            v-model="formData.password"
            label="Password"
            :type="isPwd ? 'password' : 'text'"
            :rules="formValidation.requiredRule"
          >
            <template v-slot:prepend>
              <q-icon name="key" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div class="row justify-between items-center no-flex-wrap">
            <p class="m-0">
              Forgot Password? <span class="text-primary cursor-pointer" @click="forgotPasswordModal = true">Recover it!</span>
            </p>
            <q-btn
              data-cy="submit"
              type="submit"
              :loading="submitting"
              label="Login"
              color="primary"
              ripple
              push
              class="minW-11rem"
            >
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
            </q-btn>
          </div>
        </q-form>
      </div>
    </div>
  </div>
  <q-dialog v-model="forgotPasswordModal">
    <q-card class="w-full">
      <q-card-section>
        <div class="text-h6">Reset Password</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="formData.email" :rules="formValidation.emailRules" autofocus @keyup.enter="forgotPasswordModal = false" placeholder="Email Address"/>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Send Link" v-close-popup @click="onResetPassword"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
// Import packages
import { ref } from 'vue';

// Import helper hooks
import { useValidation } from '../helpers/useValidation';

// Import composable hooks
import { useAuthHttpRequest } from '@/composables/useAuthHttpRequests';

// Import assets
import google from '../assets/google.png';
import github from '../assets/github.png';

// Import constants
import constants from '../app.constants';

const formData = ref({
  email: '',
  password: ''
});
const isPwd = ref(true);
const submitting = ref(false);
const forgotPasswordModal = ref(false);

// Initializing hooks
const formValidation = useValidation();
const authHttpRequest = useAuthHttpRequest();

/**
 * Function to signin user
 * @return {Promise<void>} return a promise
 */
const onSignIn = async (): Promise<void> => {
  submitting.value = true;
  await authHttpRequest.signInUser({ ...formData.value });
  submitting.value = false;
};

/**
 * Function to handle reset password user request
 * @return {Promise<void>} returns a void promise
 */
const onResetPassword = async(): Promise<void> => {
  submitting.value = true;
  await authHttpRequest.resetUserPassword(formData.value.email);
  submitting.value = false;
};
</script>
