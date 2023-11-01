<template>
    <ion-card class="w-full ion-no-margin rounded-3xl"
        :style="{ backgroundColor: selected ? 'var(--ion-color-success)' : 'var(--ion-color-light)' }">
        <ion-img :src="countryImg" class="h-36 object-cover"></ion-img>
        <ion-card-header>
            <div class="flex flex-row items-center">
                <div class="w-16 mr-2">
                    <img class="w-14 h-9 object-cover" :src="`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`"
                        :alt="country.name">
                </div>
                <div class="flex-auto">
                    <ion-card-title :color="'primary'" class="text-[21px] font-bold" :class="{ 'text-white': selected }">{{
                        country.name }}</ion-card-title>
                    <ion-card-subtitle class="text-lg" :class="{ 'text-white': selected }">{{ country.continent.name
                    }}</ion-card-subtitle>
                </div>
            </div>
        </ion-card-header>
    </ion-card>
</template>

<script setup lang="ts">
import { ResponseAllCountries } from '@/data/responses';
import { IonCard, IonImg, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { onMounted, ref } from 'vue';
import axios from "axios";

const props = defineProps({
    country: {
        type: Object as () => ResponseAllCountries,
        required: true,
    },
    selected: {
        type: Boolean,
        required: false,
    },
});
const baseUrl = import.meta.env.BASE_URL;
let countryImg = ref(baseUrl + 'default.png');

onMounted(() => {
    const accessKey = "19126150-166c9632a9f9a358f019e2250"; // Reemplaza con tu API Key de Unsplash

    axios.get(`https://pixabay.com/api/?key=${accessKey}&q=${props.country.name}&image_type=photo`)
        .then((response) => {
            if (response.data.hits.length !== 0) countryImg.value = response.data.hits[0].largeImageURL;
        })
        .catch((error) => {
            console.error("Error al cargar imágenes de Pixabay:", error);
        });

});
</script>

<style scoped>
ion-avatar {
    --border-radius: 4px;
}

.bg-selected {
    --background-color: var(--ion-color-dark);
}

.text-white {
    color: white;
}
</style>
