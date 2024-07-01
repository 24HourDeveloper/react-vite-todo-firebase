import { useState } from 'react'
import { Input, Flex, Button } from '@chakra-ui/react'
import { addDoc, collection, getFirestore } from "firebase/firestore";
import firebase from "../firebase";
import useGetTodos from '../hooks/useGetTodos'

export default function TodoInput() {
  const [todo, setTodo] = useState("")
  const db = getFirestore(firebase);
  const { addToList } = useGetTodos()

  const addTodo = async() => {
    try {
      const data = await addDoc(collection(db, 'todo'), {
        item: todo,
        isComplete: false
      })
      setTodo("")
      addToList(data.id, todo)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Flex gap="2" mb="4">
      <Input placeholder='Enter todo' onChange={(e) => setTodo(e.target.value)} value={todo}/>
      <Button size="md" onClick={addTodo} colorScheme='teal'>Submit</Button>
    </Flex>
  )
}
