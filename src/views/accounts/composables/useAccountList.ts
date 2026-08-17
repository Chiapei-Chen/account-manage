import { ref, computed, onMounted } from 'vue'
import { AccountAPI } from '@/service/api/account/accountApi'
import { AccountStatus, ROLE_LEVEL_LABELS } from '@/views/accounts/types/account'
import type { Account } from '@/views/accounts/types/account'
import { useDebouncedValue } from '@/composables/useDebouncedValue'

export function useAccountList() {
  /* ----------------------
     Models
  ----------------------- */
  const accounts = ref<Account[]>([])
  const loading = ref(false)
  const errorMessage = ref('')
  const searchKeyword = ref('')
  const debouncedKeyword = useDebouncedValue(searchKeyword, 300)

  const filteredAccounts = computed(() => {
    const keyword = debouncedKeyword.value.trim().toLowerCase()
    if (!keyword) return accounts.value

    return accounts.value.filter((account) =>
      [account.name, account.email, ROLE_LEVEL_LABELS[account.roleLevel]].some((field) =>
        field.toLowerCase().includes(keyword),
      ),
    )
  })

  const stats = computed(() => ({
    total: accounts.value.length,
    active: accounts.value.filter((account) => account.status === AccountStatus.ON).length,
    inactive: accounts.value.filter((account) => account.status === AccountStatus.OFF).length,
  }))

  /* ----------------------
     Methods
  ----------------------- */
  const addAccount = (account: Account) => {
    accounts.value.unshift(account)
  }

  const replaceAccount = (account: Account) => {
    const index = accounts.value.findIndex((item) => item.id === account.id)
    if (index !== -1) accounts.value[index] = account
  }

  const removeAccount = (id: string) => {
    accounts.value = accounts.value.filter((account) => account.id !== id)
  }

  /* ----------------------
     API Requests
  ----------------------- */
  const getAccountList = async () => {
    loading.value = true
    errorMessage.value = ''
    try {
      accounts.value = await AccountAPI.list.request()
    } catch {
      errorMessage.value = '帳號資料載入失敗，請稍後再試'
    } finally {
      loading.value = false
    }
  }

  onMounted(getAccountList)

  return {
    accounts,
    filteredAccounts,
    stats,
    loading,
    errorMessage,
    searchKeyword,
    getAccountList,
    addAccount,
    replaceAccount,
    removeAccount,
  }
}
