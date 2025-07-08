"use client";

import {
  createTodoList,
  deleteTodoList,
  editTodoList,
  getTodosList,
} from "@/redux/slices/todos";
import { RootState } from "@/redux/store";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "../utils/data-table";
import { columns } from "./utils/column";
import { Todo } from "@/types/todos";
import { Loading } from "../ui/loading";
import { Button } from "../ui/button";
import { DialogComponent } from "./utils/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { PlusCircle } from "lucide-react";

const HomePage = () => {
  const dispatch = useDispatch();
  const { todos, loading } = useSelector((state: RootState) => state.todos);
  const [tableData, setTableData] = useState<Todo[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(getTodosList() as any);
  }, [dispatch]);

  useEffect(() => {
    setTableData(todos);
  }, [todos]);

  const handleChangeTodoList = async (id: number, updates: Todo) => {
    console.log(id, updates);
    const todo = todos.find((todo) => todo.id === id);
    const payload = { ...todo, ...updates } as Todo;
    const response = await dispatch(editTodoList(id, payload) as any);
    if (response) {
      setTableData((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
      );
    }
  };

  const handleDeleteTodoList = async (id: number) => {
    const response = await dispatch(deleteTodoList(id) as any);
    if (response) {
      setTableData((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  const handleCreateTodoList = async () => {
    const payload = {
      title: inputRef?.current?.value || "",
      userId: 1,
      completed: false,
      id: 0,
    };
    const response = await dispatch(createTodoList(payload) as any);
    if (response) {
      setTableData((prev) => [...prev, response]);
    }
  };

  const memoizedColumns = useMemo(
    () => columns(loading, handleChangeTodoList, handleDeleteTodoList),
    [loading, handleChangeTodoList, handleDeleteTodoList, handleCreateTodoList]
  );

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center gap-5">
        <h1 className="font-bold">TODO LIST</h1>
        <DialogComponent
          trigger={
            <Button>
              <PlusCircle /> Create Todo
            </Button>
          }
          actionButton={
            <Button type="submit" onClick={() => handleCreateTodoList()}>
              Create Todo
            </Button>
          }
          form={
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="title-1">Title</Label>
                <Input id="title-1" name="title" ref={inputRef} />
              </div>
            </div>
          }
          title="Create Todo"
          description="Create a new todo list"
        />
      </div>
      <DataTable columns={memoizedColumns} data={tableData} loading={loading} />
    </>
  );
};

export default HomePage;
