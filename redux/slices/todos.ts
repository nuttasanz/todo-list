import { ENDPOINT } from "@/constants/endpoint";
import axiosInstance from "@/lib/axiosInstance";
import { Todo, TodosState } from "@/types/todos";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

const initialState: TodosState = {
  todos: [],
  loading: false,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<any>) => {
      state.todos = action.payload;
    },
    setLoading: (state, action: PayloadAction<any>) => {
      state.loading = action.payload;
    },
    clearTodos: (state) => {
      state.todos = [];
    },
  },
});

export const { setTodos, setLoading, clearTodos } = todosSlice.actions;
export default todosSlice.reducer;

export const getTodosList = () => {
  return async (dispatch: any) => {
    try {
      dispatch(clearTodos());
      dispatch(setLoading(true));
      const response = await axiosInstance.get(`${ENDPOINT.TODOS}`);
      if (response.status === 200) {
        dispatch(setTodos(response.data));
        return response.data;
      }
    } catch (error) {
      toast.error("Failed to fetch todos", {
        description: "Please try again",
      });
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const editTodoList = (id: number, payload: Todo) => {
  return async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const response = await axiosInstance.put(
        `${ENDPOINT.TODOS}/${id}`,
        payload
      );
      if (response.status === 200) {
        toast.success("Todo list has been updated");
        return response.data;
      }
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Please try again",
      });
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const deleteTodoList = (id: number) => {
  return async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const response = await axiosInstance.delete(`${ENDPOINT.TODOS}/${id}`);
      if (response.status === 200) {
        // dispatch(getTodosList())
        toast.success("Todo list has been deleted");
        return response.data;
      }
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Please try again",
      });
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const createTodoList = (payload: Todo) => {
  return async (dispatch: any) => {
    try {
      if (!payload.title) {
        toast.error("Title is required");
        return;
      }
      dispatch(setLoading(true));
      const response = await axiosInstance.post(`${ENDPOINT.TODOS}`, payload);
      if (response.status === 201) {
        toast.success("Todo list has been created");
        return response.data;
      }
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Please try again",
      });
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };
};
