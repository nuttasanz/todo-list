export interface TodosState {
  todos: Todo[];
  loading: boolean;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
