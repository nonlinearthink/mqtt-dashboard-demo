import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
// vuex持久化插件
import createPersistedState from "vuex-persistedstate";
import mutations from "./mutations";
// type
import { RootState } from "./types";
// enum
import { MqttConnectStatus } from "../constant/index";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  plugins: [createPersistedState()],
  state: {
    host: "",
    port: 0,
    path: "",
    username: "",
    password: "",
    status: MqttConnectStatus.Hanging,
    esp: []
  },
  mutations,
  actions: {},
  getters: {}
};

export default new Vuex.Store<RootState>(store);
