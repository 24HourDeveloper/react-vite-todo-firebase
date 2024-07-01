import { useEffect } from "react";
import firebase from "../firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import useStore, { Todo } from "../store";

function useGetTodos() {
  const db = getFirestore(firebase);
  const todos = useStore((state) => state.todos);
  const getTodos = useStore((state) => state.getTodos);
  const addTodo = useStore((state) => state.addTodo);

  const addToList = (id: string, todo: string) => {
    if (todos === null)
      return addTodo([{ id: id, item: todo, isComplete: false }]);
    addTodo([...todos, { id: id, item: todo, isComplete: false }]);
  };

  useEffect(() => {
    async function query() {
      const querySnapshot = await getDocs(collection(db, "todo"));
      const todos = querySnapshot.docs.map(
        (item) =>
          ({
            id: item.id,
            ...item.data(),
          } as Todo)
      );
      getTodos(todos);
    }
    query();
  }, [db, getTodos]);

  return { todos, addToList };
}

export default useGetTodos;
