declare module 'paystack' {
  interface PaystackResponse<T> {
    status: boolean
    message: string
    data: T
  }

  interface InitializeParams {
    email: string
    amount: number
    currency?: string
    reference?: string
    metadata?: Record<string, unknown>
    callback_url?: string
  }

  interface InitializeData {
    authorization_url: string
    access_code: string
    reference: string
  }

  interface VerifyData {
    id: number
    status: string
    reference: string
    amount: number
    currency: string
    metadata?: Record<string, unknown>
  }

  interface TransactionAPI {
    initialize(params: InitializeParams): Promise<PaystackResponse<InitializeData>>
    verify(params: { reference: string }): Promise<PaystackResponse<VerifyData>>
    list(params?: { perPage?: number; page?: number }): Promise<PaystackResponse<unknown[]>>
  }

  interface PlanAPI {
    create(params: { name: string; amount: number; interval: string; currency?: string }): Promise<PaystackResponse<unknown>>
    get(planId: number): Promise<PaystackResponse<unknown>>
    list(): Promise<PaystackResponse<unknown[]>>
  }

  interface CustomerAPI {
    create(params: { email: string; first_name?: string; last_name?: string }): Promise<PaystackResponse<unknown>>
    list(): Promise<PaystackResponse<unknown[]>>
  }

  interface PaystackInstance {
    transaction: TransactionAPI
    plan: PlanAPI
    customer: CustomerAPI
  }

  function Paystack(secretKey: string): PaystackInstance

  export default Paystack
}
