import { Flex } from '@chakra-ui/react'
import TodoItem from './Todo';
import { Todo } from '../store';

type Todos = {
  todos: Todo[]
}

export default function TodoList({ todos }: Todos) {
  return (
    <Flex gap="2" flexDirection="column">
      {
        todos.length > 0 ? todos.map(item => (
          <TodoItem item={item} key={item.id}/>
        )) : null
      }
    </Flex>
  )
}
