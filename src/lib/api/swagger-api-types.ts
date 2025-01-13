/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface UserData {
  /** @example "user-id-1" */
  id?: string;
  /** @example "Александр" */
  name?: string;
  /** @example "Иванов" */
  lastName?: string;
  /**
   * @format date
   * @example "1950-07-23"
   */
  birthdate?: string;
  status?: 'Начинающий' | 'Опытный';
  baseLocations?: {
    /** @example 40.712776 */
    latitude?: number;
    /** @example -74.005974 */
    longitude?: number;
    /** @example "Центральный" */
    district?: string;
    /** @example "Москва" */
    city?: string;
  }[];
  educations?: {
    /** @example "МГУ" */
    organizationName?: string;
    level?: 'Среднее общее' | 'Среднее профессиональное' | 'Высшее';
    /** @example "Филология" */
    specialization?: string;
    /** @example 1980 */
    graduationYear?: number;
  }[];
  /** @example "Дополнительная информация о пользователе." */
  additionalInfo?: string;
  contacts?: {
    /**
     * @format email
     * @example "user@example.com"
     */
    email?: string;
    /** @example "+123456789" */
    phone?: string;
    social?: {
      /** @example "@user" */
      telegram?: string;
      /** @example "+123456789" */
      whatsapp?: string;
      /** @example "user_vk_id" */
      vk?: string;
    };
  };
  favouriteRequests?: string[];
}

export interface HelpRequestData {
  /** @example "request-id-1" */
  id?: string;
  /** @example "Помощь в проекте" */
  title?: string;
  organization?: {
    /** @example "Благотворительная организация" */
    title?: string;
    isVerified?: boolean;
  };
  /** @example "Описание запроса на помощь." */
  description?: string;
  /** @example "Цель данного запроса." */
  goalDescription?: string;
  actionsSchedule?: {
    /** @example "Шаг 1" */
    stepLabel?: string;
    isDone?: boolean;
  }[];
  /**
   * @format date
   * @example "2023-12-31"
   */
  endingDate?: string;
  location?: {
    /** @example 40.712776 */
    latitude?: number;
    /** @example -74.005974 */
    longitude?: number;
    /** @example "Пресненский" */
    district?: string;
    /** @example "Москва" */
    city?: string;
  };
  contacts?: {
    /**
     * @format email
     * @example "contact@example.com"
     */
    email?: string;
    /** @example "+123456789" */
    phone?: string;
    /** @example "https://example.com" */
    website?: string;
  };
  requesterType?: 'person' | 'organization';
  helpType?: 'finance' | 'material';
  helperRequirements?: {
    helperType?: 'group' | 'single';
    isOnline?: boolean;
    qualification?: 'professional' | 'common';
  };
  /** @example 10 */
  contributorsCount?: number;
  /** @example 10000 */
  requestGoal?: number;
  /** @example 2500 */
  requestGoalCurrentValue?: number;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = '';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key)
      )
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== 'string' ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
              ? JSON.stringify(property)
              : `${property}`
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
        },
        signal:
          (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) ||
          null,
        body:
          typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
      }
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title ExpressJS API
 * @version 1.1.0
 *
 * API для управления авторизацией пользователей, данными пользователей и запросами о помощи
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @name AuthCreate
     * @summary (Auth) Авторизация пользователя и генерация JWT токена
     * @request POST:/api/auth
     */
    authCreate: (
      data: {
        /** @example "user@example.com" */
        login?: string;
        /** @example "password123" */
        password?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<
        {
          /** @example true */
          auth?: boolean;
          /** @example "jwt-token" */
          token?: string;
        },
        void
      >({
        path: `/api/auth`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name UserFavouritesList
     * @summary (LoadUserFavorites) Получение списка избранных запросов пользователя
     * @request GET:/api/user/favourites
     * @secure
     */
    userFavouritesList: (params: RequestParams = {}) =>
      this.request<string[], void>({
        path: `/api/user/favourites`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name UserFavouritesCreate
     * @summary (AddToFavourites) Добавление запроса в избранное пользователя
     * @request POST:/api/user/favourites
     * @secure
     */
    userFavouritesCreate: (
      data: {
        /** @example "request-id-1" */
        requestId?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<string, void>({
        path: `/api/user/favourites`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name UserFavouritesDelete
     * @summary (RemoveFromFavourites) Удаление запроса из избранного пользователя
     * @request DELETE:/api/user/favourites/{requestId}
     * @secure
     */
    userFavouritesDelete: (requestId: string, params: RequestParams = {}) =>
      this.request<string, void>({
        path: `/api/user/favourites/${requestId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @name UserList
     * @summary (LoadUserInfo) Получение данных профиля пользователя
     * @request GET:/api/user
     * @secure
     */
    userList: (params: RequestParams = {}) =>
      this.request<UserData, void>({
        path: `/api/user`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name RequestContributionCreate
     * @summary (ContributeToRequest) Внесение вклада в запрос на помощь
     * @request POST:/api/request/{id}/contribution
     */
    requestContributionCreate: (id: string, params: RequestParams = {}) =>
      this.request<string, void>({
        path: `/api/request/${id}/contribution`,
        method: 'POST',
        ...params,
      }),

    /**
     * No description
     *
     * @name RequestDetail
     * @summary (LoadRequestDetails) Получение деталей запроса на помощь
     * @request GET:/api/request/{id}
     */
    requestDetail: (id: string, params: RequestParams = {}) =>
      this.request<HelpRequestData, void>({
        path: `/api/request/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name RequestList
     * @summary (LoadRequests) Получение всех запросов на помощь
     * @request GET:/api/request
     */
    requestList: (params: RequestParams = {}) =>
      this.request<HelpRequestData[], void>({
        path: `/api/request`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
}
