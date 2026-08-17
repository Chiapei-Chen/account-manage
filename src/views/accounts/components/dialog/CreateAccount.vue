<script setup lang="ts">
import AccountFormFields from './AccountFormFields.vue'
import type { CreateAccountPayload } from '@/views/accounts/types/account'

const form = defineModel<CreateAccountPayload>('form', { required: true })

defineProps<{
  submitting: boolean
  errorMessage: string
}>()

const emit = defineEmits<{
  close: []
  submit: []
}>()
</script>

<template>
  <div
    class="fixed inset-0 bg-[rgba(15,17,32,0.45)] flex items-center justify-center p-6 z-[100]"
    @click.self="emit('close')"
  >
    <div class="w-full max-w-[420px] bg-white rounded-2xl shadow-[0_24px_60px_rgba(15,17,32,0.25)] p-7 pt-6">
      <div class="flex items-center justify-between pb-4 mb-5 border-b border-[#eceef5]">
        <h2 class="text-[1.05rem] text-[#1f2337]">新增帳號</h2>
        <button
          class="border-none bg-transparent text-base text-[#8a8fa3] cursor-pointer leading-none hover:text-[#1f2337]"
          type="button"
          aria-label="關閉"
          @click="emit('close')"
        >
          ✕
        </button>
      </div>

      <form @submit.prevent="emit('submit')">
        <AccountFormFields v-model="form" />

        <p v-if="errorMessage" class="text-[#e0405a] text-sm mb-3">{{ errorMessage }}</p>

        <div class="flex gap-3 mt-2">
          <button
            class="flex-1 py-2.5 rounded-[10px] text-sm font-semibold cursor-pointer border-none bg-[#f1f2f8] text-[#4b4f63] hover:bg-[#e6e8f2]"
            type="button"
            @click="emit('close')"
          >
            取消
          </button>
          <button
            class="flex-1 py-2.5 rounded-[10px] text-sm font-semibold cursor-pointer border-none bg-gradient-to-br from-indigo-500 to-indigo-600 text-white enabled:hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
            type="submit"
            :disabled="submitting"
          >
            {{ submitting ? '新增中...' : '新增帳號' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
