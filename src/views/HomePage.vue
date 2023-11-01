<template>
  <ion-page class="h-screen">
    <ion-header>
      <ion-buttons>
        <IonMenuButton />
      </ion-buttons>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="h-full">

        <div class="rounded-full shadow-lg max-w-3xl m-auto mb-6 sm:mb-14" id="menu-button" aria-expanded="true"
          aria-haspopup="true" style="background-color: var(--ion-color-light);" @click="showPopover">
          <div class="flex items-center justify-between justify-items-stretch">
            <div class="flex-auto py-2 px-7 max-w-sm">
              <ion-input class="max-w-" label="País" label-placement="stacked"
                placeholder="Escribe el país que deseas ver" @input="filterCountries"></ion-input>
            </div>

            <div class="w-32 flex items-center justify-center mr-0 sm:mr-2">
              <button type="submit"
                class="flex justify-center items-center rounded-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium text-sm px-4 py-1">
                <ion-icon slot=" icon-only" class="mr-2" size="large" :icon="search"></ion-icon>
                <p class="hidden sm:block">Buscar</p>
              </button>
            </div>
          </div>

        </div>

        <div id="popover"
          class="max-w-lg py-4 px-7 rounded-[2rem] hidden absolute right-0 z-10 mt-2 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
          <div class="flex flex-row justify-between gap-4 w-full text-lg">
            <div class="text-gray-500">
              Filtrar por continentes
            </div>

            <div class="text-green-700 cursor-pointer" @click="clearFilter">
              Limpiar
            </div>
          </div>

          <ion-grid class="ion-no-padding mt-3">
            <ion-row class="ion-justify-content-start">
              <template v-for="continente in continentes" :key="continente.name">
                <ion-col class="p-1" size-xs="12" size-sm="6" size-md="4" size="3"
                  @click="filterByContinent(continente.name)">
                  <img :class="filtros.includes(continente.name) && 'border-[3px] border-green-400'"
                    :src="diccionarioIconos[continente.code]" class="w-full object-cover h-24 rounded-2xl"
                    :alt="continente.name">
                  <p class="text-gray-500 text-sm">{{ continente.name }}</p>
                </ion-col>
              </template>
            </ion-row>
          </ion-grid>
        </div>

        <ListaPaises class="h-5/6" :countries="filteredCountries" :loading="loadings" />
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonHeader,
  IonIcon,
  IonInput,
  IonButtons,
  IonMenuButton,
  IonPage,
} from '@ionic/vue';

import { ref, onMounted, Ref } from 'vue';
import { search } from 'ionicons/icons';
import ListaPaises from '@/components/ListaPaises.vue';

import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { ResponseAllCountries, Continent } from '@/data/responses';

const GET_ITEMS = gql`
  query {
countries {
  code
    name
    continent {
      name
    }
  }
  }
`;

const GET_CONTINENTS = gql`
query {
continents {
  name,
  code,
}
}
`;

const diccionarioIconos = {
  NA: "../../public/continentes/americadelnorte.jpg",
  EU: "../../public/continentes/europa.jpg",
  AS: "../../public/continentes/asia.jpg",
  OC: "../../public/continentes/oceania.png",
  AF: "../../public/continentes/africa.jpg",
  SA: "../../public/continentes/americadelsur.png",
  AN: "../../public/continentes/antartida.png"
};

let countries: Ref<ResponseAllCountries[]> = ref([]);
let filteredCountries: Ref<ResponseAllCountries[]> = ref([]);
let filtros: Ref<string[]> = ref([]);

let continentes: Ref<Continent[]> = ref([]);

let loadings = ref(true);

const { loading, error, result, refetch } = useQuery(GET_ITEMS, {
  awaitRefetchQueries: true,
})

const consultaContinentes = useQuery(GET_CONTINENTS, {
  awaitRefetchQueries: true,
})

const showPopover = () => {
  const menuButton = document.getElementById("menu-button");
  const popover = document.getElementById("popover");
  popover!.style.display = "block";
  popover!.style.top = `${menuButton!.offsetTop + menuButton!.offsetHeight}px`;
  popover!.style.left = `${menuButton!.offsetLeft}px`;
};
onMounted(async () => {
  await refetch();
  await consultaContinentes.refetch();

  continentes.value = consultaContinentes.result.value.continents;
  console.log("CONTINENTES", continentes.value);

  countries.value = result.value.countries;
  filteredCountries.value = result.value.countries;
  loadings.value = loading.value;
  document.body.addEventListener('click', handleBodyClick);
});

const handleBodyClick = (event: MouseEvent) => {
  const menuButton = document.getElementById('menu-button');
  const popover = document.getElementById('popover');

  // Si el clic fue en el botón, muestra el popover
  if (menuButton && menuButton.contains(event.target as Node)) {
    popover!.style.display = 'block';
    popover!.style.top = `${menuButton!.offsetTop + menuButton!.offsetHeight}px`;
    popover!.style.left = `${menuButton!.offsetLeft}px`;
  } else {
    //si el click fue en el popover, no ocultarlo
    if (popover && popover.contains(event.target as Node)) {
      popover!.style.display = 'block';
    } else {
      // Si el clic fue en cualquier otro lugar, oculta el popover
      popover!.style.display = 'none';
    }
  }
};

const filterCountries = (event: any) => {
  const searchText = event.target.value.toLowerCase();
  filteredCountries.value = countries.value.filter((country: ResponseAllCountries) => {
    return country.name.toLowerCase().includes(searchText);
  });
};

const filterByContinent = (continentName: string) => {
  if (!filtros.value.includes(continentName)) {
    filtros.value.push(continentName);
  }
  else {
    filtros.value = filtros.value.filter((filtro) => {
      return filtro !== continentName;
    });
  }

  const paisesFiltrados = countries.value.filter((pais) => {
    return filtros.value.includes(pais.continent.name);
  });

  //Si los filtros estan vacios, quiero mostrar el array original
  if (filtros.value.length === 0) {
    filteredCountries.value = countries.value;
  } else {
    filteredCountries.value = paisesFiltrados;
  }
};

const clearFilter = () => {
  filtros.value = [];
  filteredCountries.value = countries.value;
};

</script>

<style>
ion-input label .label-text-wrapper {
  font-size: 24px;
  margin-bottom: 10px;
  color: rgb(81, 80, 80);
  /* Ajusta el tamaño del texto de la stacked label */
}

ion-input label {
  margin-top: -12px;
}
</style>

