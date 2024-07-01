import { Card, Text, CardBody, Flex, Button, Checkbox } from '@chakra-ui/react'
import { doc, deleteDoc, updateDoc, getFirestore } from "firebase/firestore";
import { DeleteIcon } from '@chakra-ui/icons'
import firebase from "../firebase";
import useStore, { Todo } from '../store';

type Item = {
  item: Todo
}

export default function TodoItem({ item }: Item) {
  const db = getFirestore(firebase);
  const deleteZustand = useStore(state => state.deleteTodo)
  const completeZustand = useStore(state => state.completeTodo)

  const deleteTodo = async() => {
    try {
      await deleteDoc(doc(db, "todo", item.id))
      deleteZustand(item.id)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const completeTodo = async() => {
    try {
      await updateDoc(doc(db, "todo", item.id), {
        isComplete: !item.isComplete
      })
      completeZustand(item.id)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  return (
    <Card key={item.id} size="sm" align="flex-start">
      <CardBody w="100%">
        <Flex justifyContent="space-between" alignItems="center">
          <Flex gap="2">
            <Checkbox colorScheme='teal' onChange={completeTodo} isChecked={item.isComplete}/>
            <Text decoration={`${item.isComplete ? "line-through" : ""}`}>
              {item.item}
            </Text>
          </Flex>
          <Button size='sm' variant='ghost' colorScheme='red' onClick={deleteTodo}>
            <DeleteIcon />
          </Button>
        </Flex>
      </CardBody>
    </Card>
  )
}
