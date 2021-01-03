interface RootMutationType {
  UPDATE_SETTING: string;
  SET_STATUS: string;
  PUSH_ESP_DATA: string;
}

const MutationType: RootMutationType = {
  UPDATE_SETTING: "UPDATE_SETTING",
  SET_STATUS: "SET_STATUS",
  PUSH_ESP_DATA: "PUSH_ESP_DATA"
};

export default MutationType;
