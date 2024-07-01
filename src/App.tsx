import { Flex } from '@chakra-ui/react'
import useGetTodos from './hooks/useGetTodos'
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';
import './App.css'

function App() {
  const { todos } = useGetTodos()
  if(!todos) return null

  return (
    <>
      <div>
        <TodoInput />
        <Flex gap="2" flexDirection="column">
          <TodoList todos={todos} />
        </Flex>
      </div>
    </>
  )
}

export default App
