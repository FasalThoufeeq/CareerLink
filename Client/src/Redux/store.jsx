import { configureStore } from "@reduxjs/toolkit";
import seekerReducer from './seekerSlice/seekerSlice'
import recruiterReducer from "./recuiterSlice/recruiterSlice";
import jobReducer from './recuiterSlice/recruiterjobSlice'

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (err) {
    // Handle potential errors while saving
  }
};

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    seekers:seekerReducer,
    recruiters:recruiterReducer,
    jobs:jobReducer
  },

  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});
