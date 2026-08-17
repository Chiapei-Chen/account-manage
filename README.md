# account-manage

## Getting Started

1. Clone 專案後進入資料夾：

   ```sh
   git clone <repo-url>
   cd vue3-project
   ```

2. 安裝套件：

   ```sh
   npm install
   ```

3. 設定環境變數：在專案根目錄新增 `.env` 檔案（內容另外提供），需包含以下變數：

   ```
   VITE_API_BASE_URL=
   VITE_INTERVIEWER_NAME=
   ```

4. 啟動開發伺服器：

   ```sh
   npm run dev
   ```

   啟動後預設可用瀏覽器開啟 `http://localhost:5173` 查看。

專案架構總覽
   ```
技術棧：Vue 3 (<script setup>) + TypeScript + Vite 8 + Vue Router 5 + Pinia 4 + Tailwind CSS 4 + Axios
   ```

   ```
src/
├─ main.ts              # 進入點：掛載 App、註冊 Pinia、Router
├─ App.vue              # 根元件，只有 <RouterView />
├─ router/index.ts       # 路由表 + 全域登入守衛 (beforeEach)
├─ stores/auth.ts         # Pinia store：登入狀態、token 管理
├─ service/api/
│  ├─ client.ts          # Axios 實例：baseURL、Authorization header、401 自動 refresh 攔截器
│  └─ account/accountApi.ts  # 帳號相關 API 定義 (list/detail/create/update/remove)
├─ composables/
│  └─ useDebouncedValue.ts   # 通用 debounce composable
└─ views/
   ├─ login/
   │  ├─ LoginView.vue
   │  └─ composables/useLogin.ts   # 登入表單邏輯（demo 模式，任意帳密即可登入）
   └─ accounts/
      ├─ AccountListView.vue        # 帳號列表主頁
      ├─ types/account.ts           # Account 型別、RoleLevel / AccountStatus enum
      ├─ composables/
      │  ├─ useAccountList.ts       # 取得列表、搜尋(debounce)、統計數字
      │  ├─ useAccountCreate.ts     # 新增帳號 dialog 邏輯
      │  ├─ useAccountEdit.ts       # 編輯帳號 dialog 邏輯
      │  └─ useAccountDelete.ts     # 刪除帳號邏輯
      └─ components/dialog/
         ├─ AccountFormFields.vue   # 共用表單欄位
         ├─ CreateAccount.vue
         └─ EditAccount.vue

   ```
