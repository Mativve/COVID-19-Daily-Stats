import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
// import CountryPage from '../views/CountryPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/country/:countryId',
    name: 'CountryPage',
    component: () => import( '@/views/CountryPage.vue'),
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: 'is-active',
  routes: routes
});

export default router;
