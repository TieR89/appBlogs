<template>
  <div class="post-list">
    <select v-model="selectedUserId" @change="filterPosts" class="user-select">
      <option value="">All Users</option>
      <option v-for="user in users" :key="user.id" :value="user.id">
        {{ user.name }}
      </option>
    </select>

    <ul class="posts">
      <li v-for="post in filteredPosts" :key="post.id">
        <router-link :to="{ name: 'PostDetails', params: { id: post.id } }" class="post-link">
          {{ post.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted, computed, inject } from 'vue'
import axios from 'axios'

export default {
  name: 'PostList',
  setup() {
    const posts = ref([])
    const users = ref([])
    const selectedUserId = inject('selectedUserId')

    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        posts.value = response.data
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        users.value = response.data
      } catch (error) {
        console.error('Error fetching users:', error)
      }
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

<style scoped>
.post-list {
  margin-top: 2rem;
}

.user-select {
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.posts {
  list-style-type: none;
  padding: 0;
}

.post-link {
  display: block;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #35495e;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.post-link:hover {
  background-color: #e9e9e9;
}
</style>
