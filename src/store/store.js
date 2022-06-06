import { createStore, action, persist, computed } from "easy-peasy";

// This is the store file which has variables and methods to store and get data for offline use...
const store = createStore(
  // persist - will store data, won't loss data even if you refresh the page...
  persist({
    contentTypeList: [],
    currentUser: { id: "", firstName: "", lastName: "" },
    setCurrentUserAction: action((state, payload) => {
      state.currentUser = payload;
    }),
    setContentDataAction: action((state, payload) => {
      state.contentTypeList = payload;
    }),
    getContentTypeIdByModel: computed((state) => {
      if (state.contentTypeList && state.contentTypeList.length > 0) {
        return (appLabel, model) =>
          state.contentTypeList.filter(
            (contentType) =>
              contentType.appLabel === appLabel && contentType.model === model
          )[0].id;
      }
    }),
  })
);

export default store;
