interface RootMutationType {
  UPDATE_SETTING: string;
  SET_STATUS: string;
}

const MutationType: RootMutationType = {
  UPDATE_SETTING: "UPDATE_SETTING",
  SET_STATUS: "SET_STATUS"
};

export default MutationType;
