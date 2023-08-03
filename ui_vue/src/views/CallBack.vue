<template>
  <div>
    <h2>Callback Page</h2>
    <p>Processing Authentication...</p>
  </div>
</template>

<script setup>
// Import packages
import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';

// Import composable hooks
import { useAuthHttpRequest } from '@/composables/useAuthHttpRequests';

// Import constants
import constants from '../app.constants';

// Initializing hooks
const authHttpRequest = useAuthHttpRequest();
const route = useRoute();

const socialApp = route.params.app;

onBeforeMount(async () => {
  await authHttpRequest.authCallBack(
    socialApp === constants.socialAuthorization.appNames.google
      ? constants.httpRequests.apiUrl + constants.socialAuthorization.googleCallBack
      : socialApp === constants.socialAuthorization.appNames.github
        ? constants.httpRequests.apiUrl + constants.socialAuthorization.githubCallBack
        : ''
  );
});
</script>
