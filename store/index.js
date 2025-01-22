// usar local storage desde store
const storage = window.localStorage;

export const state = () => ({
  user: storage.getItem("localUserName") || null,
});
export const mutations = {
  setUser(state, value) {
    storage.setItem("localUserName", value);
    state.user = value;
  },
};
