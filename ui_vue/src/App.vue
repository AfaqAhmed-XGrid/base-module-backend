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

// Import components
import TheNavBar from './components/TheNavBar.vue';

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
      <TheNavBar v-if="showNavbar" />
      <q-page-container>
        <q-page class="overflowX-hidden">
          <div
            class="row justify-between items-center q-ma-lg q-pa-md borderRadius-1rem bg-v-light-gray"
            v-if="showNavbar"
          >
            <div class="row items-center gap-half-rem">
              <q-icon name="home_app_logo" class="icon-size" color="positive" />
              <p class="m-0 route-size font-size">{{ route.name }}</p>
            </div>
            <p class="m-0 text-grey font-size">{{ route.path }}</p>
          </div>
          <RouterView />
          <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
            <q-btn fab icon="keyboard_arrow_up" color="accent" padding="md"/>
          </q-page-scroller>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<style scoped lang="scss">
@import './styles/breakpoints.scss';
.icon-size {
  font-size: 2.1rem;
}

.font-size {
  font-size: 1.08rem;
}

@media (max-width: $breakpoint-sm-min) {
  .icon-size {
    font-size: 1.75rem;
  }
  .font-size {
    font-size: 0.8rem;
  }
}

@media (min-width: $breakpoint-lg-min) {
  .icon-size {
    font-size: 3rem;
  }
  .font-size {
    font-size: 1.5rem;
  }
}
</style>
