<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAccountList } from './composables/useAccountList'
import { useAccountCreate } from './composables/useAccountCreate'
import { useAccountEdit } from './composables/useAccountEdit'
import { useAccountDelete } from './composables/useAccountDelete'
import CreateAccount from './components/dialog/CreateAccount.vue'
import EditAccount from './components/dialog/EditAccount.vue'
import { ROLE_LEVEL_LABELS, ACCOUNT_STATUS_LABELS, AccountStatus } from '@/views/accounts/types/account'
import type { Account } from '@/views/accounts/types/account'

const router = useRouter()
const authStore = useAuthStore()

const {
  filteredAccounts,
  stats,
  loading,
  errorMessage,
  searchKeyword,
  addAccount,
  replaceAccount,
  removeAccount,
} = useAccountList()

const createDialog = useAccountCreate(addAccount)
const editDialog = useAccountEdit(replaceAccount)
const { deletingId, errorMessage: deleteErrorMessage, deleteAccount } = useAccountDelete(removeAccount)

const roleLabel = (roleLevel: Account['roleLevel']) => ROLE_LEVEL_LABELS[roleLevel]
const statusLabel = (status: Account['status']) => ACCOUNT_STATUS_LABELS[status]
const formatDate = (iso: string) => iso.slice(0, 10)

const handleLogout = () => {
  authStore.logout()
  router.replace('/login')
}
</script>

<template>
  <div class="max-w-[900px] mx-auto px-6 pt-10 pb-16">
    <header class="flex items-center justify-between pb-5 mb-6 border-b border-[#eceef5]">
      <div class="flex items-center gap-3">
        <span
          class="w-[42px] h-[42px] rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white flex items-center justify-center shrink-0"
        >
          <svg class="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </span>
        <div>
          <h1 class="text-[1.2rem] text-[#1f2337]">帳號管理系統</h1>
          <p class="text-[0.82rem] text-[#8a8fa3]">管理您的所有帳號</p>
        </div>
      </div>
      <button
        class="flex items-center gap-1.5 py-2 px-4 border border-[#e2e4ee] rounded-lg bg-white text-[#4b4f63] text-sm cursor-pointer hover:border-indigo-500 hover:text-indigo-500"
        type="button"
        @click="handleLogout"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <path d="M16 17l5-5-5-5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M21 12H9" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        登出
      </button>
    </header>

    <div class="flex gap-3 mb-5">
      <div class="relative flex-1 flex items-center">
        <svg
          class="absolute left-3.5 w-4 h-4 text-[#a3a7ba] pointer-events-none"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" stroke-linecap="round" />
        </svg>
        <input
          v-model="searchKeyword"
          type="text"
          placeholder="搜尋帳號（姓名、郵件、角色）..."
          class="w-full py-2.5 pl-10 pr-3.5 border border-[#e2e4ee] rounded-[10px] text-sm outline-none focus:border-indigo-500"
        />
      </div>
      <button
        class="flex items-center gap-1.5 px-[1.1rem] border-none rounded-[10px] bg-gradient-to-br from-indigo-500 to-indigo-600 text-white text-[0.88rem] font-semibold cursor-pointer whitespace-nowrap hover:opacity-90"
        type="button"
        @click="createDialog.openDialog"
      >
        <span>+</span> 新增帳號
      </button>
    </div>

    <p v-if="deleteErrorMessage" class="text-[#e0405a] text-sm text-center mb-4">{{ deleteErrorMessage }}</p>

    <div class="grid grid-cols-3 gap-3.5 mb-7">
      <div class="p-4 border border-[#eceef5] rounded-xl">
        <p class="text-[0.8rem] text-[#8a8fa3] mb-1">總帳號數</p>
        <p class="text-[1.4rem] font-bold text-[#1f2337]">{{ stats.total }}</p>
      </div>
      <div class="p-4 border border-[#eceef5] rounded-xl">
        <p class="text-[0.8rem] text-[#8a8fa3] mb-1">啟用中</p>
        <p class="text-[1.4rem] font-bold text-[#1c9c5b]">{{ stats.active }}</p>
      </div>
      <div class="p-4 border border-[#eceef5] rounded-xl">
        <p class="text-[0.8rem] text-[#8a8fa3] mb-1">已停用</p>
        <p class="text-[1.4rem] font-bold text-[#d1445a]">{{ stats.inactive }}</p>
      </div>
    </div>

    <p v-if="loading" class="text-[#8a8fa3] text-center py-10">載入中...</p>
    <p v-else-if="errorMessage" class="text-[#e0405a] text-center py-10">{{ errorMessage }}</p>
    <p v-else-if="filteredAccounts.length === 0" class="text-[#8a8fa3] text-center py-10">目前尚無任何帳號</p>

    <div v-else class="grid gap-4" style="grid-template-columns: repeat(auto-fill, minmax(260px, 1fr))">
      <div v-for="account in filteredAccounts" :key="account.id" class="border border-[#eceef5] rounded-2xl p-5 pb-6">
        <div class="flex items-center justify-between mb-3">
          <span
            class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 text-white flex items-center justify-center"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
            </svg>
          </span>
          <span
            class="text-xs font-semibold py-1 px-2.5 rounded-full"
            :class="account.status === AccountStatus.ON ? 'bg-[#e3f9ee] text-[#1c9c5b]' : 'bg-[#fdeeee] text-[#d1445a]'"
          >
            {{ statusLabel(account.status) }}
          </span>
        </div>

        <p class="text-[1.02rem] font-bold text-[#1f2337] mb-2">{{ account.name }}</p>

        <p class="flex items-center gap-1.5 text-[0.82rem] text-[#676b80] mb-1.5">
          <svg class="w-3.5 h-3.5 text-[#a3a7ba] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 6-10 7L2 6" />
          </svg>
          {{ account.email }}
        </p>
        <p class="flex items-center gap-1.5 text-[0.82rem] text-[#676b80] mb-1.5">
          <svg class="w-3.5 h-3.5 text-[#a3a7ba] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
          </svg>
          {{ roleLabel(account.roleLevel) }}
        </p>
        <p class="flex items-center gap-1.5 text-[0.82rem] text-[#676b80] mb-1.5">
          <svg class="w-3.5 h-3.5 text-[#a3a7ba] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" stroke-linecap="round" />
          </svg>
          {{ formatDate(account.createdAt) }}
        </p>

        <div class="flex gap-2.5 mt-3.5 pt-3.5 border-t border-[#eceef5]">
          <button
            class="flex-1 py-2 rounded-lg border-none text-[0.82rem] font-semibold cursor-pointer bg-[#eef0fd] text-indigo-600 hover:bg-[#e0e3fb]"
            type="button"
            @click="editDialog.openDialog(account)"
          >
            ✏️ 編輯
          </button>
          <button
            class="flex-1 py-2 rounded-lg border-none text-[0.82rem] font-semibold cursor-pointer bg-[#fdeeee] text-[#d1445a] enabled:hover:bg-[#fbdfe0] disabled:opacity-60 disabled:cursor-not-allowed"
            type="button"
            :disabled="deletingId === account.id"
            @click="deleteAccount(account.id, account.name)"
          >
            🗑️ {{ deletingId === account.id ? '刪除中...' : '刪除' }}
          </button>
        </div>
      </div>
    </div>

    <CreateAccount
      v-if="createDialog.visible.value"
      v-model:form="createDialog.form.value"
      :submitting="createDialog.submitting.value"
      :error-message="createDialog.errorMessage.value"
      @close="createDialog.closeDialog"
      @submit="createDialog.submit"
    />

    <EditAccount
      v-if="editDialog.visible.value"
      v-model:form="editDialog.form.value"
      :submitting="editDialog.submitting.value"
      :error-message="editDialog.errorMessage.value"
      @close="editDialog.closeDialog"
      @submit="editDialog.submit"
    />
  </div>
</template>
