import { MqttConnectState } from "../constant/index";

export interface RootState {
  host: string;
  port: number;
  path: string;
  username: string;
  password: string;
  status: MqttConnectState;
}
