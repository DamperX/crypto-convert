import {RootStore} from './rootStore';
import {createContext, ReactNode, useContext} from 'react';

export const rootStore = new RootStore();

export const StoreContext = createContext<RootStore>({});

interface IProps {
  store: RootStore;
  children?: ReactNode;
}

export const Provider = ({store, children}: IProps) => {
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => {
  return useContext<RootStore>(StoreContext);
}
