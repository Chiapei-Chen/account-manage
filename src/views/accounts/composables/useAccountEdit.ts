import { ref } from 'vue'
import { AccountAPI } from '@/service/api/account/accountApi'
import { RoleLevel, AccountStatus, type Account, type UpdateAccountPayload } from '@/views/accounts/types/account'

export function useAccountEdit(onUpdated: (account: Account) => void) {
  /* ----------------------
     Models
  ----------------------- */
  const visible = ref(false)
  const submitting = ref(false)
  const errorMessage = ref('')
  const editingId = ref('')
  const form = ref<UpdateAccountPayload>({
    name: '',
    email: '',
    roleLevel: RoleLevel.USER,
    status: AccountStatus.ON,
  })

  /* ----------------------
     Methods
  ----------------------- */
  const openDialog = (account: Account) => {
    editingId.value = account.id
    form.value = {
      name: account.name,
      email: account.email,
      roleLevel: account.roleLevel,
      status: account.status,
    }
    errorMessage.value = ''
    visible.value = true
  }

  const closeDialog = () => {
    visible.value = false
  }

  const validate = () => {
    if (!form.value.name || !form.value.email) {
      errorMessage.value = '請輸入姓名與電子郵件'
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
      errorMessage.value = '請輸入正確的電子郵件格式'
      return false
    }
    return true
  }

  /* ----------------------
     API Requests
  ----------------------- */
  const submit = async () => {
    if (!validate()) return

    submitting.value = true
    errorMessage.value = ''
    try {
      const account = await AccountAPI.update.request(editingId.value, form.value)
      onUpdated(account)
      closeDialog()
    } catch {
      errorMessage.value = '更新帳號失敗，請稍後再試'
    } finally {
      submitting.value = false
    }
  }

  return {
    visible,
    form,
    submitting,
    errorMessage,
    openDialog,
    closeDialog,
    submit,
  }
}
