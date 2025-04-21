<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router' // 添加路由功能

const router = useRouter()
const formData = ref({
  username: '',
  password: ''
})

/**
 * 异步登录函数
 * 修改说明：
 * 1. 修正API端点路径为 /api/auth/login
 * 2. 添加登录成功后的路由跳转
 * 3. 增强错误处理逻辑
 * 4. 添加表单验证
 */
const login = async () => {
  // 基础表单验证
  if (!formData.value.username || !formData.value.password) {
    alert('请输入用户名和密码')
    return
  }

  try {
    const response = await axios.post('/api/auth/login', {
      username: formData.value.username,
      password: formData.value.password
    })

    if (response.data.success) {
      alert('登录成功！')
      // 跳转到主页或其他受保护页面
      router.push('/dashboard')
    } else {
      // 显示后端返回的具体错误信息
      alert(`登录失败：${response.data.message || '未知错误'}`)
    }
  } catch (error) {
    console.error('请求错误:', error)
    // 更详细的错误处理
    if (error.response) {
      switch (error.response.status) {
        case 401:
          alert('认证失败：用户名或密码错误')
          break
        case 404:
          alert('服务端点不存在，请检查API地址')
          break
        default:
          alert(`请求错误：${error.response.status} ${error.response.data?.message || ''}`)
      }
    } else if (error.request) {
      alert('网络连接失败，请检查服务器状态')
    } else {
      alert('请求配置错误：' + error.message)
    }
  }
}
</script>

<template>
  <div class="login-container">
    <h2>用户登录</h2>
    <form @submit.prevent="login">
      <div>
        <label>用户名：</label>
        <input
          type="text"
          v-model="formData.username"
          placeholder="请输入用户名"
          required
        >
      </div>
      <div>
        <label>密码：</label>
        <input
          type="password"
          v-model="formData.password"
          placeholder="请输入密码"
          required
        >
      </div>
      <button type="submit">登录</button>
    </form>

    <!-- 添加导航链接 -->
    <div class="nav-links">
      <router-link to="/register">注册新账号</router-link>
      <router-link to="/change-password">忘记密码？</router-link>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.nav-links {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
}

.nav-links a {
  color: #007bff;
  text-decoration: none;
  font-size: 0.9rem;
}

.nav-links a:hover {
  text-decoration: underline;
}
</style>