import Register from './components/Register/Register';
import TaskList from './components/TasksList/TasksList';
import Provider from './context/Provider';

function App() {

  return (
    <>
      <Provider>
        <main>
          <Register/>
          <TaskList />
        </main>
      </Provider>
    </>
  )
}

export default App
