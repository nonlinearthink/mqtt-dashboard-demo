import { MqttConnectStatus } from "../constant/index";
import { EspData, Color } from "../types";

export interface RootState {
  host: string;
  port: number;
  path: string;
  username: string;
  password: string;
  status: MqttConnectStatus;
  esp: EspData[];
  color: Color;
  message: string;
}
