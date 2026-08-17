import { ref } from 'vue'
import { AccountAPI } from '@/service/api/account/accountApi'

export function useAccountDelete(onDeleted: (id: string) => void) {
  /* ----------------------
     Models
  ----------------------- */
  const deletingId = ref('')

  /* ----------------------
     API Requests
  ----------------------- */
  const deleteAccount = async (id: string, name: string) => {
    if (!window.confirm(`確定要刪除帳號「${name}」嗎？此動作無法復原。`)) return

    deletingId.value = id
    try {
      await AccountAPI.remove.request(id)
      onDeleted(id)
    } finally {
      deletingId.value = ''
    }
  }

  return {
    deletingId,
    deleteAccount,
  }
}
