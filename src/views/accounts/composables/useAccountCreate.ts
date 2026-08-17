import { ref } from 'vue'
import { AccountAPI } from '@/service/api/account/accountApi'
import { RoleLevel, AccountStatus, type Account, type CreateAccountPayload } from '@/views/accounts/types/account'

const emptyForm = (): CreateAccountPayload => ({
  name: '',
  email: '',
  roleLevel: RoleLevel.USER,
  status: AccountStatus.ON,
})

export function useAccountCreate(onCreated: (account: Account) => void) {
  /* ----------------------
     Models
  ----------------------- */
  const visible = ref(false)
  const submitting = ref(false)
  const errorMessage = ref('')
  const form = ref<CreateAccountPayload>(emptyForm())

  /* ----------------------
     Methods
  ----------------------- */
  const openDialog = () => {
    form.value = emptyForm()
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
      const account = await AccountAPI.create.request(form.value)
      onCreated(account)
      closeDialog()
    } catch {
      errorMessage.value = '新增帳號失敗，請稍後再試'
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
