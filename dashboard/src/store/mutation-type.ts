interface RootMutationType {
  UPDATE_SETTING: string;
  SET_STATUS: string;
  PUSH_ESP_DATA: string;
  SET_COLOR: string;
  SET_MESSAGE: string;
}

const MutationType: RootMutationType = {
  UPDATE_SETTING: "UPDATE_SETTING",
  SET_STATUS: "SET_STATUS",
  PUSH_ESP_DATA: "PUSH_ESP_DATA",
  SET_COLOR: "SET_COLOR",
  SET_MESSAGE: "SET_MESSAGE"
};

export default MutationType;
