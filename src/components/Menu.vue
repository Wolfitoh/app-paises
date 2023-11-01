<template>
    <ion-menu content-id="main-content" type="overlay">
        <ion-content>
            <div class="flex items-center justify-center">
                <ion-img class="h-40 w-44" :src="`${baseUrl}logoapp.png`" alt="Logo"></ion-img>
            </div>
            <ion-list id="inbox-list">

                <ion-menu-toggle :auto-hide="false" v-for="(p, i) in appPages" :key="i">
                    <ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none"
                        :detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
                        <ion-icon aria-hidden="true" slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
                        <ion-label>{{ p.title }}</ion-label>
                    </ion-item>
                </ion-menu-toggle>
            </ion-list>
        </ion-content>
    </ion-menu>
</template>

<script setup lang="ts">
import {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonImg,
    IonMenu,
    IonMenuToggle,
    IonNote,
} from '@ionic/vue';
import { ref } from 'vue';
import {
    eye,
    eyeOutline,
    home,
    homeOutline,
} from 'ionicons/icons';

const baseUrl = import.meta.env.BASE_URL;
const selectedIndex = ref(0);
const appPages = [
    {
        title: 'Home',
        url: '/home',
        iosIcon: homeOutline,
        mdIcon: home,
    },
    {
        title: 'Vista 1',
        url: '/vista1',
        iosIcon: eyeOutline,
        mdIcon: eye,
    },
    {
        title: 'Vista 2',
        url: '/vista2',
        iosIcon: eyeOutline,
        mdIcon: eye,
    },
];

const path = window.location.pathname.split('folder/')[1];
console.log(path);
if (path !== undefined) {
    selectedIndex.value = appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
}
</script>

<style scoped>
ion-menu {
    --ion-background-color: var(--ion-color-light);
}

ion-menu.md ion-content {
    --padding-start: 8px;
    --padding-end: 8px;
    --padding-top: 20px;
    --padding-bottom: 20px;
}

ion-menu.md ion-list {
    padding: 20px 0;
}

ion-menu.md ion-note {
    margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
    padding-left: 10px;
}


ion-menu.md ion-list#inbox-list ion-list-header {
    font-size: 22px;
    font-weight: 600;
    min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
    font-size: 16px;
    margin-bottom: 18px;
    color: #757575;
    min-height: 26px;
}

ion-menu.md ion-item {
    --padding-start: 10px;
    --padding-end: 10px;
    border-radius: 4px;
}

ion-menu.md ion-item.selected {
    --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
    color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
    color: #616e7e;
}

ion-menu.md ion-item ion-label {
    font-weight: 500;
}

ion-menu.ios ion-content {
    --padding-bottom: 20px;
}

ion-menu.ios ion-list {
    padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
    line-height: 24px;
    margin-bottom: 20px;
}

ion-menu.ios ion-item {
    --padding-start: 16px;
    --padding-end: 16px;
    --min-height: 50px;
}

ion-menu.ios ion-item ion-icon {
    font-size: 24px;
    color: #73849a;
}

ion-menu.ios ion-item .selected ion-icon {
    color: var(--ion-color-primary);
}

ion-menu.ios ion-list#labels-list ion-list-header {
    margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
    padding-left: 16px;
    padding-right: 16px;
}

ion-menu.ios ion-note {
    margin-bottom: 8px;
}

ion-note {
    display: inline-block;
    font-size: 16px;
    color: var(--ion-color-medium-shade);
}

ion-item.selected {
    --color: var(--ion-color-primary);
}
</style>
