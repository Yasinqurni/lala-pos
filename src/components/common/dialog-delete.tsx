import { DialogHeader, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "../ui/dialog";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface DialogDeleteProps {
    onSubmit: () => void;
    title: string;
    isLoading: boolean;
    onCancel?: () => void;
}


export default function DialogDelete({
    isLoading,
    onSubmit,
    title,
    onCancel
}: DialogDeleteProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <form className="grid gap-6">
        <DialogHeader>
          <DialogTitle>Delete {title}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this{' '} 
            <span className="font-bold lowercase">{title}</span>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={onSubmit} disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : 'Delete'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}