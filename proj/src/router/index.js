import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/heatmap',
      name: 'heatmap',
      component: () => import('../views/HeatMap.vue'),
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: () => import('../views/TimeLine.vue'),
    },
    {
      path: '/chartdata',
      name: 'chartdata',
      component: () => import('../views/ChartData.vue'),
    }
  ],
})

export default router
