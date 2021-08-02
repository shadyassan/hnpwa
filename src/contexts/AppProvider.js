import { createContext, useState, useContext } from 'react';
import { getAllDataAPI } from '../api/newsApi';

export const AppStateContext = createContext();
export const AppDispatchContext = createContext();

export const initialState = {
  lists: [],
  loading: false,
  error: null,
};

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useState(initialState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

export function useAppState() {
  const state = useContext(AppStateContext);
  if (!state) {
    throw Error('useAppState must be used within AppContextProvider');
  }
  return state;
}

export function useAppDispatch() {
  const dispatch = useContext(AppDispatchContext);
  if (!dispatch) {
    throw Error('useAppDispatch must be used within AppContextProvider');
  }
  return dispatch;
}

export function useFetch() {
  const dispatch = useAppDispatch();

  return function (url, page) {
    try {
      dispatch((prev) => ({ ...prev, loading: true }));
      getAllDataAPI(url, page).then((data) => {
        dispatch((prev) => ({
          ...prev,
          lists: [...prev.lists, ...data],
          loading: false,
        }));
      });
    } catch (e) {
      dispatch((prev) => ({ ...prev, error: e.message }));
    }
  };
}
