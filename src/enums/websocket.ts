export enum MessageType {
  send = 0,
  receive = 1,
  subscribeEvent = 2,
  event = 3,
  unsubscribeEvent = 4,
  error = 5,
}

export enum WssFunctionNameMessageType {
  AuthenticateUser = 'AuthenticateUser',
  GetLevel1Summary = 'GetLevel1Summary',
  LogOut = 'LogOut',
}
