import { createRouter, createWebHistory } from 'vue-router'
import PostList from '@/components/PostList.vue'
import PostDetails from '@/components/PostDetails.vue'

const routes = [
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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
