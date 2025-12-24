import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import practiceReducer from './slices/practiceSlice';
import bookReaderReducer from './slices/bookReaderSlice';
import storage from './storage';

const rootReducer = combineReducers({
  practice: practiceReducer,
  bookReader: bookReaderReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['practice', 'bookReader'], // Persist practice and bookReader state
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PAUSE', 'persist/PURGE', 'persist/REGISTER'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

