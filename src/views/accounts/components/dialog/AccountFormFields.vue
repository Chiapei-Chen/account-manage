<script setup lang="ts">
import { RoleLevel, ROLE_LEVEL_LABELS, AccountStatus, ACCOUNT_STATUS_LABELS } from '@/views/accounts/types/account'
import type { CreateAccountPayload, UpdateAccountPayload } from '@/views/accounts/types/account'

const form = defineModel<CreateAccountPayload | UpdateAccountPayload>({ required: true })
</script>

<template>
  <div class="mb-[1.1rem] text-left">
    <label class="block text-sm text-[#4b4f63] mb-1.5">姓名 <span class="text-[#e0405a]">*</span></label>
    <input
      v-model="form.name"
      type="text"
      placeholder="請輸入姓名"
      class="w-full py-2.5 px-3.5 border border-[#e2e4ee] rounded-[10px] text-sm text-[#1f2337] bg-white outline-none transition-colors focus:border-indigo-500 placeholder:text-[#b3b6c6]"
    />
  </div>

  <div class="mb-[1.1rem] text-left">
    <label class="block text-sm text-[#4b4f63] mb-1.5">電子郵件 <span class="text-[#e0405a]">*</span></label>
    <input
      v-model="form.email"
      type="email"
      placeholder="email@example.com"
      class="w-full py-2.5 px-3.5 border border-[#e2e4ee] rounded-[10px] text-sm text-[#1f2337] bg-white outline-none transition-colors focus:border-indigo-500 placeholder:text-[#b3b6c6]"
    />
  </div>

  <div class="mb-[1.1rem] text-left">
    <label class="block text-sm text-[#4b4f63] mb-1.5">角色 <span class="text-[#e0405a]">*</span></label>
    <select
      v-model="form.roleLevel"
      class="w-full py-2.5 px-3.5 border border-[#e2e4ee] rounded-[10px] text-sm text-[#1f2337] bg-white outline-none transition-colors focus:border-indigo-500"
    >
      <option v-for="roleLevel in RoleLevel" :key="roleLevel" :value="roleLevel">{{ ROLE_LEVEL_LABELS[roleLevel] }}</option>
    </select>
  </div>

  <div class="mb-[1.1rem] text-left">
    <label class="block text-sm text-[#4b4f63] mb-1.5">狀態 <span class="text-[#e0405a]">*</span></label>
    <select
      v-model="form.status"
      class="w-full py-2.5 px-3.5 border border-[#e2e4ee] rounded-[10px] text-sm text-[#1f2337] bg-white outline-none transition-colors focus:border-indigo-500"
    >
      <option v-for="status in AccountStatus" :key="status" :value="status">
        {{ ACCOUNT_STATUS_LABELS[status] }}
      </option>
    </select>
  </div>
</template>
