// @flow

export type LoginStateType = {
  isConnected: boolean,
};

export type Credentials = {
  userName: string,
  password: string,
  requestedOtpMethod: OtpMethod,
}

export type CredentialsWithOtp = {
  userName: string,
  password: string,
  otp: string,
}

export type AdminSession = {
  webSessionToken: string,
  refreshDurationInMillis: number,
  inactiveDurationInMillis: number,
}

export type AdminSessionObject = {
  webSessionToken: string,
  refreshDurationInMillis: number,
  inactiveDurationInMillis: number,
}

export type AdminUser = {
  idUser: number,
  userName: string,
  fullName: string,
  permissions: string[],
  businessUnitId: number,
  businessUnitCountryCode: string,
  showNewCaseButtonInDashboard: boolean,
  showViewFilterInDashboard: boolean,
  showIdentification: boolean,
  showQualification: boolean,
  showLogoInDocument: boolean,
  showTeleAdviceReport: boolean,
  showChat: boolean,
  canSendByFax: boolean,
  doctorShouldCallback: boolean,
}

export type DisconnectedReason = 'idle' | 'expired'

export type LoginStage = 'FIRST_FACTOR' | 'SECOND_FACTOR'

export type OtpMethod = 'SMS' | 'EMAIL'
