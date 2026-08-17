<script setup lang="ts">
import { useLogin } from './composables/useLogin'

const { form, errorMessage, loading, handleLogin } = useLogin()
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-[linear-gradient(135deg,#eef1fd_0%,#e6e9fb_100%)]">
    <div class="w-full max-w-[420px] bg-white rounded-[20px] p-10 shadow-[0_20px_45px_rgba(79,70,229,0.12)] text-center">
      <div
        class="w-14 h-14 mx-auto mb-5 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 text-white flex items-center justify-center"
      >
        <svg class="w-[26px] h-[26px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10 17l5-5-5-5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M15 12H3" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M21 3v18" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>

      <h1 class="text-[1.4rem] font-bold text-[#1f2337] mb-1.5">歡迎回來</h1>
      <p class="text-sm text-[#8a8fa3] mb-7">請登入您的帳號以繼續</p>

      <form class="text-left" @submit.prevent="handleLogin">
        <div class="mb-[1.1rem]">
          <label for="email" class="block text-sm text-[#4b4f63] mb-1.5">電子郵件</label>
          <div class="relative flex items-center">
            <svg
              class="absolute left-3.5 w-[18px] h-[18px] text-[#a3a7ba] pointer-events-none"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 6-10 7L2 6" />
            </svg>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="your@email.com"
              autocomplete="username"
              class="w-full py-2.5 pl-10 pr-3.5 border border-[#e2e4ee] rounded-[10px] text-sm text-[#1f2337] outline-none transition-colors focus:border-indigo-500 placeholder:text-[#b3b6c6]"
            />
          </div>
        </div>

        <div class="mb-[1.1rem]">
          <label for="password" class="block text-sm text-[#4b4f63] mb-1.5">密碼</label>
          <div class="relative flex items-center">
            <svg
              class="absolute left-3.5 w-[18px] h-[18px] text-[#a3a7ba] pointer-events-none"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input
              id="password"
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              autocomplete="current-password"
              class="w-full py-2.5 pl-10 pr-3.5 border border-[#e2e4ee] rounded-[10px] text-sm text-[#1f2337] outline-none transition-colors focus:border-indigo-500 placeholder:text-[#b3b6c6]"
            />
          </div>
        </div>

        <div class="flex items-center justify-between mb-5 text-sm">
          <label class="flex items-center gap-1.5 text-[#4b4f63] cursor-pointer">
            <input v-model="form.remember" type="checkbox" class="accent-indigo-500" />
            記住我
          </label>
          <a class="text-indigo-500 no-underline hover:underline" href="#" @click.prevent>忘記密碼？</a>
        </div>

        <p v-if="errorMessage" class="text-[#e0405a] text-sm mb-3.5">{{ errorMessage }}</p>

        <button
          class="w-full flex items-center justify-center gap-2 py-3.5 rounded-[10px] bg-gradient-to-br from-indigo-500 to-indigo-600 text-white text-[0.95rem] font-semibold cursor-pointer transition-opacity enabled:hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
          type="submit"
          :disabled="loading"
        >
          <svg class="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <path d="M10 17l5-5-5-5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M15 12H3" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          {{ loading ? '登入中...' : '登入' }}
        </button>

        <div class="mt-4 py-3 px-3.5 rounded-[10px] bg-[#eef4ff] text-[#4f5b93] text-[0.82rem] text-center">
          💡 提示：輸入任意電子郵件和密碼即可登入
        </div>
      </form>

      <p class="mt-6 text-sm text-[#8a8fa3]">
        還沒有帳號？
        <a class="text-indigo-500 font-semibold no-underline hover:underline" href="#" @click.prevent>立即註冊</a>
      </p>
    </div>
  </div>
</template>
