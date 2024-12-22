// user.ts
import { post, get } from '@/utils/http'

interface LoginParams {
  account_id: string
  password: string
}

interface LoginResponse {
  success: boolean
  token?: string
  message?: string
}

export async function login(params: LoginParams): Promise<LoginResponse> {
  try {
    const data: LoginResponse = await post('/api/login', params)
    if (data.success && data.token) {
      // 将 token 保存到 localStorage
      localStorage.setItem('token', data.token)
    }
    return data
  } catch (error: any) {
    // 处理登录错误
    console.error('登录失败：', (error as Error).message)
    throw error
  }
}

// 注册
interface RegisterParams {
  account_id: string
  password: string
  username: string
  security_key: string
}

interface RegisterResponse {
  success: boolean
  message?: string
}

export async function register(params: RegisterParams): Promise<RegisterResponse> {
  try {
    const data: RegisterResponse = await post('/api/register', params)
    return data
  } catch (error: any) {
    // 处理注册错误
    console.error('注册失败：', (error as Error).message)
    throw error
  }
}

// 重置密码
interface ResetPasswordParams {
  account_id: string
  password: string
  security_key: string
}

interface ResetPasswordResponse {
  success: boolean
  message?: string
}

export async function resetPassword(params: ResetPasswordParams): Promise<ResetPasswordResponse> {
  try {
    const data: ResetPasswordResponse = await post('/api/reset-password', params)
    return data
  } catch (error: any) {
    // 处理重置密码错误
    console.error('重置密码失败：', (error as Error).message)
    throw error
  }
}

// 获取用户信息
interface UserInfo {
  username: string
  user_id: string
  createdAt: string
}

interface GetUserInfoResponse {
  success: boolean
  data?: UserInfo
  message?: string
}
// get请求 /api/user/info
export async function getUserInfoApi(): Promise<GetUserInfoResponse> {
  try {
    const data: GetUserInfoResponse = await get('/api/user/info')
    return data
  } catch (error: any) {
    // 处理获取用户信息错误
    console.error('获取用户信息失败：', (error as Error).message)
    throw error
  }
}
