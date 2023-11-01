<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <p class="ion-padding text-lg"> Hola, esta es la Vista 2</p>
            <ion-fab slot="fixed" vertical="center" horizontal="start">
                <IonMenuButton />
            </ion-fab>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import {
    IonContent,
    IonPage,
} from '@ionic/vue';


</script>
