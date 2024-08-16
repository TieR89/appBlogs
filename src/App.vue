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

<style>
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}

#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

header {
  background-color: #35495e;
  color: #fff;
  text-align: center;
  padding: 1rem;
  margin-bottom: 2rem;
}

header h1 {
  margin: 0;
}

.home-link {
  cursor: pointer;
  transition: color 0.3s ease;
}

.home-link:hover {
  color: #42b983;
}
</style>
