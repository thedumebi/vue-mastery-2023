import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const HomeVue = () => import('@/views/Home.vue')

const routes = [{
  path: '/',
  name: 'home',
  alias: '/home', // alias is like an additional path for the component. useful if you dont want to do a redirect. redirect is better for seo
  component: HomeVue
}, {
  path: '/about',
  name: 'about',
  component: () => import('@/views/About.vue')
}, {
  path: '/manage-music',
  name: 'manage',
  component: () => import('@/views/Manage.vue'),
  meta: { requiresAuth: true },
  beforeEnter: (_to, _from, next) => {
    // console.log("Manage Route Guard")
    next()
  }
}, {
  path: '/manage',
  redirect: { name: 'manage' }
}, {
  path: '/song/:id',
  name: 'song',
  component: () => import('@/views/Song.vue')
},{
  path: '/:catchAll(.*)*',
  redirect: { name: 'home' }
}]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
  // routes: [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (About.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import('../views/About.vue')
  // }
  // ]
})

router.beforeEach((to, _from, next) => {
  // console.log("Global Route Guard")

  // if no requiresAuth then no need to be logged in; continue
  if (!to.meta.requiresAuth) {
    return next()
  }

  // check if user is logged in
  const store = useUserStore()
  if (store.userLoggedIn) {
    next()
  } else {
    next({ name: 'home' })
  }
})

export default router
