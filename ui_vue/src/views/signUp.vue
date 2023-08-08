<template>
  <div class="row justify-between minH-fullview">
    <div class="col-md-7 col column justify-center items-center">
      <div class="maxH-fullview px-1rem w-full maxW-32rem">
        <div class="column q-mb-lg">
          <h4 class="heading-two">CineINFO</h4>
          <p class="sub-heading-two text-accent">Welcome,</p>
          <p class="sub-sub-heading-two text-light-pink">
            It only takes a <span class="text-positive">few seconds</span> to create your account
          </p>
        </div>
        <div class="row justify-between q-mb-lg gap-1rem">
          <q-btn
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
        <p class="my-1rem">Or signup with regular account</p>
        <q-form class="column" @submit.prevent="onSignUp">
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
            data-cy="userName"
            outlined
            v-model="formData.displayName"
            label="User Name"
            :rules="formValidation.requiredRule"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input
            data-cy="password"
            outlined
            v-model="formData.password"
            label="Password"
            :type="isPwd ? 'password' : 'text'"
            :rules="formValidation.passwordRules"
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
          <q-input
            data-cy="confirmPassword"
            outlined
            v-model="formData.confirmPassword"
            label="Confirm Password"
            :type="isConfrmPwd ? 'password' : 'text'"
            :rules="[(val: string) => (val && val === formData.password) || 'Both passwords does not match']"
          >
            <template v-slot:prepend>
              <q-icon name="check" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isConfrmPwd ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="isConfrmPwd = !isConfrmPwd"
              />
            </template>
          </q-input>
          <div class="row justify-between items-center no-flex-wrap">
            <p class="m-0">Already a member? <RouterLink to="/sign-in">Signin</RouterLink></p>
            <q-btn
              data-cy="submit"
              type="submit"
              :loading="submitting"
              label="Create Account"
              color="primary"
              class="no-white-wrap"
            >
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
            </q-btn>
          </div>
        </q-form>
      </div>
    </div>
    <div class="col-md-5 col-0 bg-image-one text-white column justify-center">
      <div class="dark-opaque-bg"></div>
      <div class="q-mx-xl">
        <h4 class="text-center heading-one">Discover CineInfo - Your Ultimate Movie Dashboard!</h4>
        <p class="text-center sub-heading-one text-light-gray">
          Authenticate, explore movies in tables, and visualize data with dynamic charts. Your go-to
          app for cinematic insights. Sign up now and dive into the world of movies like never
          before!
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import packages
import { ref } from 'vue';

// Import helper hooks
import { useValidation } from '../helpers/useValidation';

// Import composables hooks
import { useAuthHttpRequest } from '@/composables/useAuthHttpRequests';

// Import constants
import constants from '../app.constants';

// Import assets
import google from '../assets/google.png';
import github from '../assets/github.png';

const formData = ref({
  email: '',
  displayName: '',
  password: '',
  confirmPassword: ''
});

const isPwd = ref(true);
const isConfrmPwd = ref(true);
const submitting = ref(false);

// Initializing hooks
const formValidation = useValidation();
const authHttpRequest = useAuthHttpRequest();

/**
 * Function to signup user
 * @return {Promise<void>} returns a promise
 */
const onSignUp = async (): Promise<void> => {
  submitting.value = true;
  await authHttpRequest.signUpUser({ ...formData.value });
  submitting.value = false;
};
</script>
