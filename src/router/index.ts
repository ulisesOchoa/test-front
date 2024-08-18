import { createRouter, createWebHistory } from 'vue-router'
import Customer from '@/views/customer/Customer.vue'
import Supplier from '@/views/supplier/Supplier.vue'
import Quality from '@/views/Quality.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'customer',
      component: Customer
    },
    {
      path: '/supplier',
      name: 'supplier',
      component: Supplier
    },
    {
      path: '/quality',
      name: 'quality',
      component: Quality
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
