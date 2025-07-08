import { ColumnDef } from "@tanstack/react-table";
import { Todo } from "@/types/todos";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { useRef } from "react";
import { DialogComponent } from "./dialog";

export const columns = (
  loading: boolean,
  handleChangeTodoList: (id: number, updates: Todo) => void,
  handleDeleteTodoList: (id: number) => void
): ColumnDef<Todo>[] => [
  {
    id: "select",
    cell: ({ row }) => (
      <Checkbox
        checked={row.getValue("completed")}
        onCheckedChange={(value) => {
          handleChangeTodoList(row.original.id, {
            ...row.original,
            completed: !!value,
          });
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "userId",
    header: "User ID",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("userId")}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "completed",
    header: () => <div className="text-center">Completed</div>,
    cell: ({ row }) => {
      const isCompleted = row.getValue("completed");

      return (
        <div className="text-center font-medium">
          {isCompleted ? "Finished" : "Not Finished"}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const inputRef = useRef<HTMLInputElement>(null);
      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DialogComponent
                trigger={
                  <Button variant={"ghost"} className="w-full justify-start">
                    <Edit />
                    Edit
                  </Button>
                }
                form={
                  <div className="grid gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="title-1">Title</Label>
                      <Input
                        id="title-1"
                        name="title"
                        defaultValue={row.original.title}
                        ref={inputRef}
                      />
                    </div>
                  </div>
                }
                actionButton={
                  <Button
                    type="submit"
                    onClick={() =>
                      handleChangeTodoList(row.original.id, {
                        ...row.original,
                        title: inputRef?.current?.value || "",
                      })
                    }
                  >
                    Save changes
                  </Button>
                }
                title="Edit task title"
                description="Make changes to your todo list here. Click save when you're done."
              />
              <DialogComponent
                trigger={
                  <Button variant={"ghost"} className="w-full justify-start">
                    <Trash2 />
                    Delete
                  </Button>
                }
                actionButton={
                  <Button
                    type="submit"
                    className="bg-red-500"
                    disabled={loading}
                    onClick={() => handleDeleteTodoList(row.original.id)}
                  >
                    Delete
                  </Button>
                }
                title="Are you absolutely sure?"
                description="This action cannot be undone. This will permanently delete your task and remove your data from our servers"
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
