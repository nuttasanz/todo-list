import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function DialogComponent({
  trigger,
  actionButton,
  title,
  form,
  description,
}: {
  trigger: React.ReactNode;
  actionButton: React.ReactNode;
  form?: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            <span className="text-red-500">{description}</span>
          </DialogDescription>
        </DialogHeader>
        {form}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>{actionButton}</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
