<template>
  <div>
    <select v-model="selectedUserId" @change="filterPosts">
      <option value="">All Users</option>
      <option v-for="user in users" :key="user.id" :value="user.id">
        {{ user.name }}
      </option>
    </select>

    <ul>
      <li v-for="post in filteredPosts" :key="post.id">
        <router-link :to="{ name: 'PostDetails', params: { id: post.id } }">
          {{ post.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

export default {
  name: 'PostList',
  setup() {
    const posts = ref([])
    const users = ref([])
    const selectedUserId = ref('')

    const fetchPosts = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
      posts.value = response.data
    }

    const fetchUsers = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users')
      users.value = response.data
    }

    const filteredPosts = computed(() => {
      if (!selectedUserId.value) return posts.value
      return posts.value.filter((post) => post.userId === parseInt(selectedUserId.value))
    })

    const filterPosts = () => {
      // вызывается, когда пользователь выбирает другого пользователя
      // фильтрация осуществляется с помощью вычисляемого свойства
    }

    onMounted(() => {
      fetchPosts()
      fetchUsers()
    })

    return {
      posts,
      users,
      selectedUserId,
      filteredPosts,
      filterPosts
    }
  }
}
</script>
