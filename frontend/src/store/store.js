import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { combineReducers } from 'redux';
import userReducer from "./userSlice.js";
import conversationReducer from "./conversationSlice.js";
import messageReducer from "./messageSlice.js";

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//     conversation: conversationReducer,
//     message: messageReducer,
//   },
// });


const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
    user: userReducer,
    conversation: conversationReducer,
    message: messageReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;