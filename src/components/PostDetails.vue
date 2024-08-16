<template>
  <div v-if="post">
    <h2>{{ post.title }}</h2>
    <p>{{ post.body }}</p>

    <h3>Author</h3>
    <p v-if="user">{{ user.name }} ({{ user.email }})</p>

    <h3>Comments</h3>
    <ul>
      <li v-for="comment in comments" :key="comment.id">
        <p>
          <strong>{{ comment.name }}</strong
          >: {{ comment.body }}
        </p>
      </li>
    </ul>

    <h4>Add a comment</h4>
    <form @submit.prevent="addComment">
      <input v-model="newComment.name" placeholder="Your name" required />
      <input v-model="newComment.email" placeholder="Your email" required />
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
