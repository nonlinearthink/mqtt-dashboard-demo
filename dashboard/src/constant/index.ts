export enum MqttConnectState {
  Hanging = 0,
  Connecting = 1,
  Connected = 2
}

export enum MqttQos {
  AtMostOnce = 0,
  AtLeastOnce = 1,
  OnlyOnce = 2
}
