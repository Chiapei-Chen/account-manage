/** 帳號角色等級 */
export const RoleLevel = {
  ADMIN: 'ADMIN',
  EDITOR: 'EDITOR',
  USER: 'USER',
  CLIENT: 'CLIENT',
} as const

export type RoleLevel = (typeof RoleLevel)[keyof typeof RoleLevel]

export const ROLE_LEVEL_LABELS: Record<RoleLevel, string> = {
  ADMIN: '管理員',
  EDITOR: '修改者',
  USER: '用戶',
  CLIENT: '訪客',
}

/** 帳號是否啟用 */
export const AccountStatus = {
  ON: 'ON',
  OFF: 'OFF',
} as const

export type AccountStatus = (typeof AccountStatus)[keyof typeof AccountStatus]

export const ACCOUNT_STATUS_LABELS: Record<AccountStatus, string> = {
  ON: '啟用',
  OFF: '停用',
}

export interface Account {
  id: string
  name: string
  email: string
  roleLevel: RoleLevel
  status: AccountStatus
  createdAt: string
}

export interface CreateAccountPayload {
  name: string
  email: string
  roleLevel: RoleLevel
  status: AccountStatus
}

export type UpdateAccountPayload = Partial<CreateAccountPayload>
