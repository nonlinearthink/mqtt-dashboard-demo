import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
// vuex持久化
import createPersistedState from "vuex-persistedstate";
// type
import { RootState } from "./types";
import { FormModel } from "../types";
// enum
import { MqttConnectState } from "../constant/index";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  plugins: [createPersistedState()],
  state: {
    host: "",
    port: 0,
    path: "",
    username: "",
    password: "",
    status: MqttConnectState.Hanging
  },
  mutations: {
    UPDATE_SETTING(state, form: FormModel) {
      state.host = form.host;
      state.port = form.port;
      state.path = form.path;
      state.username = form.username;
      state.password = form.password;
    }
  },
  actions: {},
  getters: {}
};

export default new Vuex.Store<RootState>(store);
