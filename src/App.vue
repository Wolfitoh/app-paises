<template>
  <ion-app>
    <ion-split-pane content-id="main-content" max-width="100">
      <Menu />
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>


<script setup lang="ts">
import Menu from '@/components/Menu.vue';
import {
  IonRouterOutlet,
  IonSplitPane,
  IonApp,
} from '@ionic/vue';

</script>

<style scoped>
.split-pane-visible>ion-menu {
  max-width: 304px !important;
}
</style>
