import type from "./mutation-type";
import { RootState } from "./types";
import { FormModel } from "../types";
import { MqttConnectStatus } from "../constant/index";
import { EspData } from "../types";

const mutation = {
  [type.UPDATE_SETTING as string](state: RootState, form: FormModel) {
    state.host = form.host;
    state.port = form.port;
    state.path = form.path;
    state.username = form.username;
    state.password = form.password;
  },
  [type.SET_STATUS as string](state: RootState, status: MqttConnectStatus) {
    state.status = status;
  },
  [type.PUSH_ESP_DATA as string](state: RootState, data: EspData) {
    if (state.esp.length >= 10) {
      state.esp.shift();
      state.esp.push(data);
    } else {
      state.esp.push(data);
    }
  }
};

export default mutation;
