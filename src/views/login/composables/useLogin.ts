import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export function useLogin() {
  /* ----------------------
     Models
  ----------------------- */
  const form = ref({
    email: '',
    password: '',
    remember: false,
  })

  const errorMessage = ref('')
  const loading = ref(false)

  /* ----------------------
     Methods
  ----------------------- */
  const router = useRouter()
  const route = useRoute()
  const authStore = useAuthStore()

  const validate = () => {
    if (!form.value.email || !form.value.password) {
      errorMessage.value = '請輸入電子郵件與密碼'
      return false
    }
    return true
  }

  const handleLogin = async () => {
    errorMessage.value = ''
    if (!validate()) return

    loading.value = true
    try {
      // Demo 模式：任意 email/password 皆視為登入成功
      authStore.login(form.value.email, form.value.remember)
      const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/accounts'
      await router.replace(redirect)
    } finally {
      loading.value = false
    }
  }

  return {
    form,
    errorMessage,
    loading,
    handleLogin,
  }
}
