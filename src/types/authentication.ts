export interface IAuthError {
  Authenticated: boolean
  Locked: boolean
  errormsg: string
}

export interface IAuth {
  Authenticated: boolean
  SessionToken: string
  User: {
    UserId: number
    UserName: string
    Email: string
    EmailVerified: boolean
    AccountId: number
    OmsId: number
    Use2FA: boolean
  }
  Locked: boolean
  Requires2FA: boolean
  TwoFAType: string
  TwoFAToken: string
  errormsg: string
}
