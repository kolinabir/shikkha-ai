"use client";

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/lib/store';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<div className="min-h-screen flex items-center justify-center">লোড হচ্ছে...</div>} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

