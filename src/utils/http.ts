// http.ts

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface RequestConfig {
  url: string
  method?: Method
  headers?: HeadersInit
  body?: any
  timeout?: number
}

type RequestInterceptor = (config: RequestConfig) => RequestConfig | Promise<RequestConfig>
type ResponseInterceptor = (response: any) => any

// 动态设置 baseURL
const baseURL = import.meta.env.DEV ? '' : 'http://127.0.0.1:7001'

// 默认超时时间（毫秒）
const defaultTimeout = 5000

// 请求拦截器列表
const requestInterceptors: RequestInterceptor[] = []

// 响应拦截器列表
const responseInterceptors: ResponseInterceptor[] = []

// 添加请求拦截器
function addRequestInterceptor(interceptor: RequestInterceptor) {
  requestInterceptors.push(interceptor)
}

// 添加响应拦截器
function addResponseInterceptor(interceptor: ResponseInterceptor) {
  responseInterceptors.push(interceptor)
}

// 处理请求拦截器
async function handleRequestInterceptors(config: RequestConfig): Promise<RequestConfig> {
  for (const interceptor of requestInterceptors) {
    config = await interceptor(config)
  }
  return config
}

// 处理响应拦截器
async function handleResponseInterceptors(response: any): Promise<any> {
  for (const interceptor of responseInterceptors) {
    response = await interceptor(response)
  }
  return response
}

// 超时处理函数
function timeoutFetch(fetchPromise: Promise<Response>, timeout: number): Promise<Response> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('请求超时'))
    }, timeout)

    fetchPromise
      .then(response => {
        clearTimeout(timer)
        resolve(response)
      })
      .catch(err => {
        clearTimeout(timer)
        reject(err)
      })
  })
}

// 主请求函数
async function request(config: RequestConfig): Promise<any> {
  // 合并配置
  config = {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
    timeout: defaultTimeout,
    ...config
  }

  // 处理请求拦截器
  config = await handleRequestInterceptors(config)

  const { url, method, headers, body, timeout } = config

  // 拼接基础 URL
  const fetchUrl = baseURL + url

  // 发起请求
  let response: Response
  try {
    response = await timeoutFetch(
      fetch(fetchUrl, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined
      }),
      timeout!
    )
  } catch (error) {
    // 请求错误（如超时）
    return Promise.reject(error)
  }

  // 解析响应数据
  let responseData
  try {
    responseData = await response.json()
  } catch (error) {
    responseData = null
  }

  // 将响应和数据传递给响应拦截器
  const processedResponse = await handleResponseInterceptors({
    response,
    data: responseData
  })

  return processedResponse
}

// 各种 HTTP 方法的快捷函数
export function get(url: string, config?: Omit<RequestConfig, 'url' | 'method'>): Promise<any> {
  return request({ ...config, url, method: 'GET' })
}

export function post(url: string, body: any, config?: Omit<RequestConfig, 'url' | 'method' | 'body'>): Promise<any> {
  return request({ ...config, url, method: 'POST', body })
}

export function put(url: string, body: any, config?: Omit<RequestConfig, 'url' | 'method' | 'body'>): Promise<any> {
  return request({ ...config, url, method: 'PUT', body })
}

export function del(url: string, config?: Omit<RequestConfig, 'url' | 'method'>): Promise<any> {
  return request({ ...config, url, method: 'DELETE' })
}

// 在模块内部添加请求拦截器，自动添加 Authorization 头
addRequestInterceptor(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`
    }
  }
  return config
})

// 在模块内部添加响应拦截器，检查响应状态
addResponseInterceptor(({ response, data }) => {
  if (response.ok && data && data.success) {
    // 请求成功，返回数据
    return data
  } else {
    // 请求失败，抛出错误
    const errorMsg = data && data.message ? data.message : '请求失败'
    ElMessage.error(errorMsg)
    return Promise.reject(new Error(errorMsg))
  }
})
