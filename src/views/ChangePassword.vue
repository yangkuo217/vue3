<script setup>
import { ref } from 'vue'
import axios from 'axios'

const formData = ref({
  username: '',
  oldPassword: '',
  newPassword: ''
})

/**
 * 处理密码修改
 */
const handleChangePassword = async () => {
  try {
    // 1:发送修改密码请求到后端, 2:使用新密码重新登陆; 格式为:http://localhost:5173/change-password
    const response = await axios.post('/api/user/change-password', formData.value)

    if (response.data.success) {
      alert('密码修改成功')
    } else {
      alert('修改失败: ' + response.data.message)
    }
  } catch (error) {
    console.error('修改密码请求错误:', error)
    alert('修改密码失败')
  }
}
</script>

<template>
  <div class="auth-container">
    <h2>修改密码</h2>
    <form @submit.prevent="handleChangePassword">
      <div class="form-group">
        <label>用户名：</label>
        <input type="text" v-model="formData.username" required>
      </div>
      <div class="form-group">
        <label>旧密码：</label>
        <input type="password" v-model="formData.oldPassword" required>
      </div>
      <div class="form-group">
        <label>新密码：</label>
        <input type="password" v-model="formData.newPassword" required>
      </div>
      <button type="submit" class="submit-btn">确认修改</button>
    </form>
  </div>
</template>