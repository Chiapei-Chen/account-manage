import apiClient from '../client'
import type { Account, CreateAccountPayload, UpdateAccountPayload } from '@/views/accounts/types/account'

export const AccountAPI = {
  list: {
    path: '/accounts',
    request: (signal?: AbortSignal) =>
      apiClient.get<Account[]>('/accounts', { signal }).then((res) => res.data),
  },
  detail: {
    path: '/account/:id',
    request: (id: string, signal?: AbortSignal) =>
      apiClient.get<Account>(`/account/${id}`, { signal }).then((res) => res.data),
  },
  create: {
    path: '/create-account',
    request: (payload: CreateAccountPayload) =>
      apiClient
        .post<{ message: string; account: Account }>('/create-account', payload)
        .then((res) => res.data.account),
  },
  update: {
    path: '/update-account/:id',
    request: (id: string, payload: UpdateAccountPayload) =>
      apiClient
        .patch<{ message: string; account: Account }>(`/update-account/${id}`, payload)
        .then((res) => res.data.account),
  },
  remove: {
    path: '/delete-account/:id',
    request: (id: string) =>
      apiClient.delete<{ message: string }>(`/delete-account/${id}`).then((res) => res.data),
  },
} as const
