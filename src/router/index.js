import { createRouter, createWebHistory } from 'vue-router'
import PostList from '@/components/PostList.vue'
import PostDetails from '@/components/PostDetails.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'PostList',
      component: PostList
    },
    {
      path: '/post/:id',
      name: 'PostDetails',
      component: PostDetails,
      props: true
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
