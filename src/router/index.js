import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'infoView',
    component: () => import(/* webpackChunkName: "about" */ '../views/InfoView.vue')
  },
  {
    path: '/mascotas',
    name: 'mascotas',
    component: () => import(/* webpackChunkName: "about" */ '../views/MascotasView.vue')
  },
  {
    path: '/clientes',
    name: 'clientes',
    component: () => import(/* webpackChunkName: "about" */ '../views/ClientesView.vue')
  },
  {
    path: '/adopcion/:id',
    name: 'adopcion',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdopcionView.vue')
  },
  {
    path: '/detalle/:id',
    name: 'detalle',
    component: () => import(/* webpackChunkName: "about" */ '../views/DetalleView.vue')
  },
  {
    path: '/formCreatePet',
    name: 'formCreatePet',
    component: () => import(/* webpackChunkName: "about" */ '../views/FormCreatePetView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
