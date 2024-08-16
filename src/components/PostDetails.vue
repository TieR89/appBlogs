<template>
  <div v-if="post" class="post-details">
    <h2>{{ post.title }}</h2>
    <p class="post-body">{{ post.body }}</p>
    
    <h3>Author</h3>
    <p v-if="user" class="user-info">{{ user.name }} ({{ user.email }})</p>
    
    <h3>Comments</h3>
    <ul class="comments">
      <li v-for="comment in comments" :key="comment.id" class="comment">
        <p><strong>{{ comment.name }}</strong>: {{ comment.body }}</p>
      </li>
    </ul>
    
    <h4>Add a comment</h4>
    <form @submit.prevent="addComment" class="comment-form">
      <input v-model="newComment.name" placeholder="Your name" required>
      <input v-model="newComment.email" placeholder="Your email" required>
      <textarea v-model="newComment.body" placeholder="Your comment" required></textarea>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'PostDetails',
  props: ['id'],
  setup(props) {
    const post = ref(null)
    const user = ref(null)
    const comments = ref([])
    const newComment = ref({
      name: '',
      email: '',
      body: ''
    })

    const fetchPostDetails = async () => {
      const postResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${props.id}`)
      post.value = postResponse.data

      const userResponse = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${post.value.userId}`
      )
      user.value = userResponse.data

      const commentsResponse = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${props.id}/comments`
      )
      comments.value = commentsResponse.data
    }

    const addComment = async () => {
      try {
        const response = await axios.post(
          `https://jsonplaceholder.typicode.com/posts/${props.id}/comments`,
          newComment.value
        )
        comments.value.push(response.data)
        newComment.value = { name: '', email: '', body: '' }
        alert('Comment added successfully!')
      } catch (error) {
        alert('Failed to add comment. Please try again.')
      }
    }

    onMounted(fetchPostDetails)

    return {
      post,
      user,
      comments,
      newComment,
      addComment
    }
  }
}
</script>

<style scoped>
.post-details {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2, h3, h4 {
  color: #35495e;
}

.post-body {
  margin-bottom: 2rem;
  line-height: 1.6;
}

.user-info {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
}

.comments {
  list-style-type: none;
  padding: 0;
}

.comment {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
}

.comment-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 2rem;
}

.comment-form input,
.comment-form textarea {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.comment-form button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.comment-form button:hover {
  background-color: #3aa876;
}
</style>
