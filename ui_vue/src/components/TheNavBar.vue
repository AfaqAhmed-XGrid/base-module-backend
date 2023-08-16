<template>
  <q-header class="bg-white" elevated>
    <q-toolbar>
      <q-btn flat @click="drawer = !drawer" round dense icon="menu" avatar color="black" />
      <q-toolbar-title class="text-uppercase text-light-mode">Cine Info</q-toolbar-title>
      <q-btn
        color="black"
        :icon="user?.profilePicture ? 'img:' + user?.profilePicture : 'person'"
        auto-close
        flat
        padding="none"
        size="1.35rem"
        class="border-circle"
      >
        <q-menu>
          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div class="text-h6 q-mb-xs">Links</div>
              <q-list>
                <q-item clickable v-ripple to="/edit-profile">
                  <q-item-section avatar class="mr--1rem">
                    <q-icon name="account_circle" class="mr--1rem" />
                  </q-item-section>
                  <q-item-section class="text-nowrap"> Full Profile </q-item-section>
                </q-item>

                <q-item clickable v-ripple to="/change-password">
                  <q-item-section avatar class="mr--1rem">
                    <q-icon name="lock" class="mr--1rem" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-nowrap">Change Password</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column items-center" v-if="user">
              <q-avatar size="72px">
                <q-icon
                  size="72px"
                  color="grey"
                  name="account_circle"
                  v-if="!user || !user.profilePicture"
                />
                <img
                  :src="user?.profilePicture ? user?.profilePicture : 'person'"
                  alt=""
                  v-if="user?.profilePicture"
                />
              </q-avatar>

              <div class="text-subtitle1 q-mt-md q-mb-xs text-capitalize text-nowrap">
                {{ user.displayName }}
              </div>

              <q-btn color="primary" label="Logout" push size="sm" v-close-popup @click="logout" />
            </div>
          </div>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-header>

  <q-drawer
    v-model="drawer"
    show-if-above
    :width="200"
    :breakpoint="500"
    elevated
    class="text-white bg-light-black"
  >
    <q-scroll-area class="fit">
      <q-list padding>
        <q-item clickable v-ripple :active="route.path === navItem.link" :to="navItem.link" v-for="(navItem, ind) in constants.navbarDrawerItems" :key="navItem.name+ind">
          <q-item-section avatar>
            <q-icon :name="navItem.icon" />
          </q-item-section>

          <q-item-section> {{ navItem.name }} </q-item-section>
        </q-item>

        <q-separator dark />

        <q-item
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="account_box" />
          </q-item-section>

          <q-item-section> User Profile </q-item-section>
          <q-menu>
            <div class="row no-wrap q-pa-xs">
              <q-list>
                <q-item
                  clickable
                  v-ripple
                  :active="route.path === '/edit-profile'"
                  to="/edit-profile"
                >
                  <q-item-section avatar>
                    <q-icon name="face" />
                  </q-item-section>
  
                  <q-item-section> Edit Profile </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-ripple
                  :active="route.path === '/change-password'"
                  to="/change-password"
                >
                  <q-item-section avatar>
                    <q-icon name="key" />
                  </q-item-section>
  
                  <q-item-section> Change Password </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-menu>
          
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup lang="ts">
// Import packages
import { ref, onMounted, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Import composable hooks
import { useAuthHttpRequest } from '@/composables/useAuthHttpRequests';

// Import types
import type { User } from '@/app.model';

// Import constants
import constants from '@/app.constants';

const drawer = ref(false);
const user: Ref<null | User | void> = ref(null);

// Initializing hooks
const authHttpRequest = useAuthHttpRequest();
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  user.value = await authHttpRequest.getUser();
});

/**
 * Function to logout user by deleting the token from local storage
 * @return {void}
 */
const logout = () => {
  localStorage.clear();
  router.push(constants.pages.signIn.link);
};
</script>

<style lang="scss">
@import '../styles/global.styles.scss';
</style>
