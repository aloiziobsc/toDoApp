import { useCallback, useEffect, useState } from "react";
import { initialValue, AppContext } from "./AppContext";
import { AppContextProps, Task } from "./ContextTypes";

const Provider = ({ children }: AppContextProps) => {
  const [tasks, setTasks] = useState(initialValue.tasks);
  const changeTasks = (newTasks:Array<Task>) => {
    const orderTasks = newTasks.sort((b, a) => new Date(a.date).getTime() - new Date(b.date).getTime())
    setTasks(orderTasks)
    window.localStorage.setItem('tasks', JSON.stringify(orderTasks));
  }
  const data = { tasks, changeTasks }

  const verifyLocalStorage = useCallback(() => {
    const historyTasks = localStorage.getItem('tasks');
    if(!historyTasks) {
      return
    } else {
      setTasks(JSON.parse(historyTasks))
    }
  }, [tasks])

  useEffect(() => {
    verifyLocalStorage()
  }, []);
  
  return (
    <AppContext.Provider value={ data }>
      {children}
    </AppContext.Provider>
  );
}

export default Provider;