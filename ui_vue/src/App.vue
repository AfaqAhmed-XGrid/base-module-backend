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

<script setup lang="ts">
// Import packages
import { RouterView, useRoute, useRouter } from 'vue-router';
import { onMounted, ref, watch } from 'vue';

// Import scss
import './styles/quasar.variables.scss';

// Import constants
import constants from './app.constants';

// Initializing hooks
const route = useRoute();
const router = useRouter();

const showNavbar = ref(false);

onMounted(async() => {
  await router.isReady();
  showNavbar.value = route.path !== constants.pages.signIn.link && route.path !== constants.pages.signUp.link && route.name !== constants.pages.callBack.name;
});

watch(route, () => {
  showNavbar.value = route.path !== constants.pages.signIn.link && route.path !== constants.pages.signUp.link && route.name !== constants.pages.callBack.name;
});
</script>

<template>
  <div>
    <q-layout view="hHh Lpr lff">
      <q-page-container>
        <q-page>
          <RouterView />
          <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
            <q-btn fab icon="keyboard_arrow_up" color="accent" />
          </q-page-scroller>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
