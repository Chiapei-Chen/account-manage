import { ref } from 'vue'
import { AccountAPI } from '@/service/api/account/accountApi'

export function useAccountDelete(onDeleted: (id: string) => void) {
  /* ----------------------
     Models
  ----------------------- */
  const deletingId = ref('')
  const errorMessage = ref('')

  /* ----------------------
     API Requests
  ----------------------- */
  const deleteAccount = async (id: string, name: string) => {
    if (!window.confirm(`確定要刪除帳號「${name}」嗎？此動作無法復原。`)) return

    deletingId.value = id
    errorMessage.value = ''
    try {
      await AccountAPI.remove.request(id)
      onDeleted(id)
    } catch {
      errorMessage.value = '刪除帳號失敗，請稍後再試'
    } finally {
      deletingId.value = ''
    }
  }

  return {
    deletingId,
    errorMessage,
    deleteAccount,
  }
}
