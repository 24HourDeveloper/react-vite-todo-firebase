import useGetTodos from './hooks/useGetTodos'
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';
import './App.css'

function App() {
  const { todos } = useGetTodos()
  if(!todos) return null

  return (
    <>
      <TodoInput />
      <TodoList todos={todos} />
    </>
  )
}

export default App
