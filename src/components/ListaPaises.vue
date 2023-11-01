<template>
    <ion-grid class='h-full' :fixed="true" id="click-trigger">
        <template v-if="loading">
            <div class="flex justify-center items-center w-full h-full">
                <IonSpinner name="crescent" />
                <p class='ml-2'>Por favor espera...</p>
            </div>
        </template>
        <template v-else-if="countries.length !== 0">
            <ion-row class="ion-justify-content-center">
                <template v-for="country in countries" :key="country.code">
                    <ion-col class="p-3" size-xs="12" size-sm="6" size-md="4" size="3">
                        <CardPais :country="country" @click="searchCountry(country.code)"
                            :selected="country.code === countrySelected?.code" />
                    </ion-col>
                </template>
            </ion-row>
        </template>
    </ion-grid>

    <ion-popover v-model="showSplitPane" trigger="click-trigger" trigger-action="click" side="right"
        @ionPopoverDidDismiss="clearCountrySelected">
        <ion-content class="ion-padding">
            <div class="flex flex-col">
                <img class="w-full object-cover" :src="countrySelected?.countryImg" alt="">
                <div class="flex flex-row items-center mt-5">
                    <div class="w-16 mr-2">
                        <img class="w-14 h-9 object-cover"
                            :src="`https://flagcdn.com/w20/${countrySelected?.code.toLowerCase()}.png`"
                            :alt="countrySelected?.name">
                    </div>
                    <div class="flex-auto">
                        <ion-card-title :color="'primary'" class="text-[21px] font-bold">{{ countrySelected?.name
                        }}</ion-card-title>
                        <ion-card-subtitle class="text-lg">{{ countrySelected?.continent.name }}</ion-card-subtitle>
                    </div>
                </div>
                <div class="flex flex-col gap-2 mt-3">
                    <ion-label class="text-xl text-green-800 font-bold">Capital: <span
                            class="text-gray-500 ml-3 font-normal">{{
                                countrySelected?.capital }}</span></ion-label>
                    <ion-label class="text-xl text-green-800 font-bold">Language: <span
                            class="text-gray-500 ml-3 font-normal">{{
                                countrySelected?.languages.map(language => language.name).join(', ')
                            }}</span></ion-label>
                    <ion-label class="text-xl text-green-800 font-bold">Currency: <span
                            class="text-gray-500 ml-3 font-normal">{{
                                countrySelected?.currencies.map(currenci => currenci).join(', ')
                            }}</span></ion-label>
                    <ion-label class="text-xl text-green-800 font-bold">Regiones:</ion-label>
                    <ion-list>
                        <ion-item class="ion-no-padding" v-for="state in countrySelected?.states" :key="state.name">
                            <ion-label>{{ state.name }}</ion-label>
                        </ion-item>
                    </ion-list>

                </div>
            </div>
        </ion-content>
    </ion-popover>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { IonGrid, IonSpinner, IonPopover, IonContent, IonRow, IonCol, IonList, IonItem } from '@ionic/vue';
import { provideApolloClient, useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag'
import { ResponseAllCountries, Country } from '@/data/responses';
import CardPais from './CardPais.vue';
import axios from 'axios';

import { apolloClient } from '@/main';

provideApolloClient(apolloClient)

const GET_COUNTRY = gql`
  query GetCountryDetails($id: ID!) {
    country(code: $id) {
      name
      code
      continent {
        name
      }
      capital
      languages {
        name
      }
      currencies
      states {
        name
      }
    }
  }
`;

const props = defineProps({
    countries: {
        type: Array as () => ResponseAllCountries[],
        required: true,
    },
    loading: {
        type: Boolean,
        required: true,
    },
});

let countrySelected = ref<Country>();

const showSplitPane = ref(false);

let id = ref('');

const searchCountry = async (code: string) => {
    id.value = code;
    const { result, refetch } = useQuery(GET_COUNTRY, {
        id: id.value,
        awaitRefetchQueries: true,
    });

    const accessKey = "19126150-166c9632a9f9a358f019e2250";

    await refetch();
    console.log(id.value, code)
    if (result.value && result.value.country) {
        console.log(result.value.country);
        let country: Country = result.value.country;
        const countryCopy = Object.assign({}, country); // Crear una copia del objeto country

        axios.get(`https://pixabay.com/api/?key=${accessKey}&q=${country.name}&image_type=photo`)
            .then((response) => {
                if (response.data.hits.length !== 0) {
                    countryCopy.countryImg = response.data.hits[0].largeImageURL;
                    countrySelected.value = countryCopy;
                } else {
                    countrySelected.value = countryCopy;
                }
            })
            .catch((error) => {
                console.error("Error al cargar imágenes de Pixabay:", error);
            });
    }
};

const clearCountrySelected = () => {
    countrySelected.value = undefined;
};
</script>

<style scoped>
ion-popover {
    --color: white;
    --width: 350px;
}
</style>
