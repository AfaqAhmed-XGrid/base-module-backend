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
  <div class="table-container q-pa-md">
    <div>
      <div class="border-bottom-light-grey flex justify-between no-flex-wrap pb-half-rem">
        <h5 class="heading-three text-primary">Movies Data</h5>
        <q-btn
          label="Explore More"
          unelevated
          to="/movies-data"
          size="0.75rem"
          icon="movie"
          v-if="shorterTable"
        />
        <q-btn
          label="Apply Filter"
          color="primary"
          @click="filterForm = true"
          v-if="!shorterTable"
        />
      </div>
      <table class="data-table" cellspacing="0">
        <thead>
          <tr>
            <th
              v-for="heading in shorterTable
                ? constants.movieTable.shorterTableheadings
                : constants.movieTable.completeTableheadings"
              :key="heading"
            >
              {{ heading }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(movie, ind) in moviesData" :key="movie.title + ind">
            <td>{{ movie.title || '-' }}</td>
            <td>{{ movie.releaseDate?.toString().slice(0, 10) || '-' }}</td>
            <td>{{ movie.productionBudget || '-' }}</td>
            <td v-if="!shorterTable">{{ movie.domesticGross || '-' }}</td>
            <td>{{ movie.worldWideGross || '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="my-1rem pb-half-rem">
      <q-pagination
        v-model="currentPage"
        color="purple"
        :max="totalPages"
        :max-pages="6"
        boundary-numbers
        direction-links
        boundary-links
        icon-first="skip_previous"
        icon-last="skip_next"
        icon-prev="fast_rewind"
        icon-next="fast_forward"
        class="flex justify-center"
      />
    </div>
    <q-select
      v-model="filterData.limit"
      outlined
      label="Items per page"
      :options="constants.movieTable.features.limit"
      class="w-16rem"
    />
    <q-dialog v-model="filterForm">
      <q-card class="bg-white maxW-32rem p-1rem w-full">
        <q-card-section>
          <div class="text-h6 text-capitalize">Apply Filters</div>
        </q-card-section>
        <q-card-section>
          <q-form class="column gap-1rem" @submit.prevent="onApplyingFilter">
            <q-input data-cy="search" outlined v-model="filterData.search" label="Search by title" />
            <q-select
              v-model="filterData.sort"
              outlined
              label="Sort"
              :options="constants.movieTable.features.sort"
            />
            <q-input
              outlined
              v-model="filterData[filterItem.vModel]"
              type="number"
              :label="filterItem.title"
              :key="filterItem.title + ind"
              v-for="(filterItem, ind) in constants.movieTable.features.filter"
            />
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
                label="Apply"
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
  </div>
</template>

<script setup lang="ts">
// Import packages
import { ref, watch, type Ref } from 'vue';

// Import types
import type { MovieData } from '@/app.model';

// Import constants
import constants from '@/app.constants';

// Import hooks
import { useMoviesHttpRequests } from '@/composables/useMoviesHttpRequests';

// Initializing hooks
const moviesHttpRequests = useMoviesHttpRequests();

// Prop Type
interface Props {
  data: {
    movies: MovieData[]
    totalPages: number
    movieCount: number
  }
  shorterTable: boolean
}

// Defining Props
const props = defineProps<Props>();

// Defining reactive variables
const moviesData = ref(props.data.movies);
const shorterTable = ref(props.shorterTable);
const totalPages = ref(props.data.totalPages);
const currentPage = ref(1);
const filterForm = ref(false);
const filterData: Ref<{ [key: string]: number | string }> = ref({
  search: '',
  sort: '-releaseDate',
  limit: 10,
  'productionBudget[$lte]': 999999999999999,
  'productionBudget[$gte]': 0,
  'domesticGross[$lte]': 999999999999999,
  'domesticGross[$gte]': 0,
  'worldWideGross[$lte]': 999999999999999,
  'worldWideGross[$gte]': 0
});

watch(currentPage, async () => {
  const moviesDataResponse = await moviesHttpRequests.getMoviesData({ pageNo: currentPage.value });
  moviesData.value = moviesDataResponse.data.movies;
});

watch(filterData.value, async () => {
  currentPage.value = 1;
  const moviesDataResponse = await moviesHttpRequests.getMoviesData({ ...filterData.value });
  moviesData.value = moviesDataResponse.data.movies;
  totalPages.value = moviesDataResponse.data.totalPages;
});

/**
 * Function to make http request with filter queries
 * @return {void}
 */
const onApplyingFilter = async () => {
  currentPage.value = 1;
  const moviesDataResponse = await moviesHttpRequests.getMoviesData({ ...filterData.value });
  moviesData.value = moviesDataResponse.data.movies;
  totalPages.value = moviesDataResponse.data.totalPages;
};
</script>

<style scoped lang="scss">
@import '../styles/global.styles.scss';
</style>
