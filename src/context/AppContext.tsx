import { createContext } from 'react';
import { AppContextType, Task } from './ContextTypes';

export const initialValue:AppContextType = {
  tasks: [],
  changeTasks: () => {},
}

export const AppContext = createContext<AppContextType>(initialValue);
