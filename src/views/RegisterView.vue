<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const formData = ref({
  username: '',
  password: '',
  email: ''
})

/**
 * 这是处理注册提交
 */
const handleRegister = async () => {
  try {
    // 1:发送注册请求到后端,2:使用注册的用户登录; 格式为:http://localhost:5173/register
    const response = await axios.post('/api/auth/register', formData.value)

    if (response.data.success) {
      alert('注册成功，请登录')
      router.push('/login')
    } else {
      alert('注册失败: ' + response.data.message)
    }
  } catch (error) {
    console.error('注册请求错误:', error)
    alert('注册失败，请检查输入')
  }
}
</script>

<template>
  <div class="auth-container">
    <h2>用户注册</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label>用户名：</label>
        <input type="text" v-model="formData.username" required>
      </div>
      <div class="form-group">
        <label>密码：</label>
        <input type="password" v-model="formData.password" required>
      </div>
      <div class="form-group">
        <label>邮箱：</label>
        <input type="email" v-model="formData.email" required>
      </div>
      <button type="submit" class="submit-btn">注册</button>
    </form>
    <router-link to="/login">已有账号？立即登录</router-link>
  </div>
</template>

<style scoped>
.auth-container {
  /* 同登录样式 */
}
</style>