import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface AuthUser {
  email: string
}

interface StoredAuth {
  user: AuthUser
  token: string
  refreshToken: string
}

const STORAGE_KEY = 'auth'

// 從 localStorage/sessionStorage 讀取並解析登入資訊
function loadAuth(): StoredAuth | null {
  const raw = localStorage.getItem(STORAGE_KEY) ?? sessionStorage.getItem(STORAGE_KEY)
  return raw ? (JSON.parse(raw) as StoredAuth) : null
}

// 產生一組帶前綴的隨機 token 字串
function issueToken(prefix: string) {
  return `${prefix}-${crypto.randomUUID()}`
}

export const useAuthStore = defineStore('auth', () => {
  const initial = loadAuth()
  const user = ref<AuthUser | null>(initial?.user ?? null)
  const token = ref<string | null>(initial?.token ?? null)
  const refreshToken = ref<string | null>(initial?.refreshToken ?? null)
  const remembered = ref(!!localStorage.getItem(STORAGE_KEY))

  const isLoggedIn = computed(() => !!user.value && !!token.value)

  // 把目前的登入資訊寫入 localStorage 或 sessionStorage，並清掉另一邊
  function persist() {
    if (!user.value || !token.value || !refreshToken.value) return
    const payload: StoredAuth = { user: user.value, token: token.value, refreshToken: refreshToken.value }
    const storage = remembered.value ? localStorage : sessionStorage
    const other = remembered.value ? sessionStorage : localStorage
    storage.setItem(STORAGE_KEY, JSON.stringify(payload))
    other.removeItem(STORAGE_KEY)
  }

  // 簽發 token，記錄登入使用者並儲存
  function login(email: string, remember: boolean) {
    user.value = { email }
    token.value = issueToken('demo-token')
    refreshToken.value = issueToken('demo-refresh')
    remembered.value = remember
    persist()
  }

  // 簽發新的 access token 並儲存
  async function refreshAccessToken(): Promise<string | null> {
    if (!refreshToken.value) return null
    token.value = issueToken('demo-token')
    persist()
    return token.value
  }

  // 清除登入狀態與所有已儲存的資料
  function logout() {
    user.value = null
    token.value = null
    refreshToken.value = null
    localStorage.removeItem(STORAGE_KEY)
    sessionStorage.removeItem(STORAGE_KEY)
  }

  return { user, token, isLoggedIn, login, logout, refreshAccessToken }
})
