import { create } from "zustand";

export type Todo = {
  id: string;
  item: string;
  isComplete: boolean;
};

type Todos = {
  todos: Todo[];
};
type TodoStore = {
  todos: Todo[];
  getTodos: (todos: Todo[]) => void;
  addTodo: (todo: Todo[]) => void;
  deleteTodo: (todoId: string) => void;
  completeTodo: (todoId: string) => void;
};

const useStore = create<TodoStore>((set) => ({
  todos: [],
  getTodos: (items) => set({ todos: items }),
  addTodo: (item) => set({ todos: item }),
  deleteTodo: (itemId: string) =>
    set((state: Todos) => ({
      todos: state.todos.filter((todo) => todo.id !== itemId),
    })),
  completeTodo: (itemId: string) =>
    set((state) => ({
      todos: state.todos.map((todo) => {
        if (todo.id === itemId) todo.isComplete = !todo.isComplete;
        return todo;
      }),
    })),
}));

export default useStore;
