import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import Vista1Page from '../views/Vista1Page.vue'
import Vista2Page from '../views/Vista2Page.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/vista1',
    name: 'Vista1',
    component: Vista1Page
  },
  {
    path: '/vista2',
    name: 'Vista2',
    component: Vista2Page
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
