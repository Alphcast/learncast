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
    status: string
    reference: string
    amount: number
    metadata?: Record<string, unknown>
  }

  interface TransactionAPI {
    initialize(params: InitializeParams): Promise<PaystackResponse<InitializeData>>
    verify(params: { reference: string }): Promise<PaystackResponse<VerifyData>>
  }

  interface PaystackInstance {
    transaction: TransactionAPI
  }

  function Paystack(secretKey: string): PaystackInstance
  export default Paystack
}
