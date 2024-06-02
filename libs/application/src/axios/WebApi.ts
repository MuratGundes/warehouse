import Api from './Api'
import { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios'

const getDefaultBaseUrl = (): string => {
  return 'http://localhost:3004/api'
}

export class WebApi {
  private readonly baseUrl: string
  private readonly withDefaultHeaders: boolean

  constructor(baseUrl: string, withDefaultHeaders = true) {
    this.baseUrl = getDefaultBaseUrl()
    this.withDefaultHeaders = withDefaultHeaders
  }

  public async request(requestConfig: AxiosRequestConfig): Promise<AxiosResponse> {
    return Api.request({
      ...requestConfig,
      baseURL: this.baseUrl,
      headers: this.setDefaultHeaders(requestConfig.headers),
    })
  }

  private setDefaultHeaders(headers: RawAxiosRequestHeaders): RawAxiosRequestHeaders {
    if (this.withDefaultHeaders) {
      return {
        ...headers,
      }
    }
    return headers
  }

  public async buildJsonContentTypeRequest(
    url: string,
    params: object | undefined = undefined
  ): Promise<AxiosResponse> {
    return this.request({
      url,
      headers: {
        'Content-Type': 'application/json',
      },
      params,
    })
  }
}
