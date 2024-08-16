<template>
  <div id="app">
    <header>
      <h1 @click="goHome" class="home-link">App Blogs :)</h1>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'App',
  setup() {
    const router = useRouter()

    const goHome = () => {
      router.push({ name: 'PostList' })
    }

    return {
      goHome
    }
  }
}
</script>
