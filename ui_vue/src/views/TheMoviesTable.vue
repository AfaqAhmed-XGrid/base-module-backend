<!-- /*
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
*/ -->

<template>
  <div class="q-ma-md">
    <div class="flex-row-center my-1rem" color="primary">
      <q-btn label="Create New" color="positive" @click="movieForm = true"/>
    </div>
    <div class="overflowX-sm-scroll">
      <TheMovieTable
        :data="movieData"
        :shorter-table="false"
        v-if="movieData"
        class="minW-30rem"
        key="theMovieTable"
      />
    </div>
  </div>
  <q-dialog v-model="movieForm">
    <q-card class="bg-white maxW-32rem p-1rem w-full">
      <q-card-section>
        <div class="text-h6 text-capitalize">Create new movie data</div>
      </q-card-section>
      <q-card-section>
        <q-form class="column" @submit.prevent="onSaveMovie">
          <q-input
            :data-cy="input.cypress"
            outlined
            v-model="formData[input.vModel]"
            :type="input.type"
            :label="input.title"
            :rules="formValidation.requiredRule"
            :key="input.title + ind"
            v-for="(input, ind) in constants.movieTable.newMovieInputs"
          >
            <template v-slot:prepend>
              <q-icon :name="input.icon" />
            </template>
          </q-input>
          <div class="row justify-between items-center no-flex-wrap">
            <q-btn
              data-cy="cancel"
              type="button"
              label="Cancel"
              color="negative"
              ripple
              push
              class="minW-11rem"
              v-close-popup
            />
            <q-btn
              data-cy="submit"
              type="submit"
              :loading="submitting"
              label="Create"
              color="primary"
              ripple
              push
              class="minW-11rem"
              v-close-popup
            >
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
            </q-btn>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
  
<script setup lang="ts">
// Import packages
import { onBeforeMount, ref, type Ref } from 'vue';
  
// Import components
import TheMovieTable from '@/components/TheMovieTable.vue';
  
// Import composable hooks
import { useMoviesHttpRequests } from '@/composables/useMoviesHttpRequests';
  
// Import helper hooks
import { useValidation } from '../helpers/useValidation';

// Import constants
import constants from '@/app.constants';
  
// Defining reactive variables
const movieData = ref(null);
const movieForm = ref(false);
const submitting = ref(false);
const formData: Ref<{ [key: string]: number | string }> = ref({
  title: '',
  releaseDate: new Date().toISOString().split('T')[0],
  productionBudget: 0,
  worldWideGross: 0,
  domesticGross: 0,
});
  
// Initializing composable hooks
const moviesHttpRequests = useMoviesHttpRequests();
const formValidation = useValidation();

onBeforeMount(async () => {
  const moviesDataResponse = await moviesHttpRequests.getMoviesData({ });
  movieData.value = moviesDataResponse.data;
});

/**
 * Function to save movie data in db
 * @return {voild} returns void
 */
const onSaveMovie = async() => {
  await moviesHttpRequests.saveMovieData({ ...formData.value });
};
</script>
