import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/home',
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


router.beforeEach((to, from, next) => {
  if(to.name === 'login' && localStorage.getItem("jwt") !== null) next({name: 'infoView'})
  if (to.name !== 'login' && localStorage.getItem("jwt") == null) next({ name: 'login' })
  else next()
})

export default router
