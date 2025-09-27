import { Pause } from "lucide-react";
import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils/cn";

type EndPracticeDialogProps = {
  endSessionDialogIsOpen: boolean;
  setEndSessionDialogIsOpen: (open: boolean) => void;
};

export default function EndSessionDialog({
  endSessionDialogIsOpen,
  setEndSessionDialogIsOpen,
}: EndPracticeDialogProps) {
  return (
    <Dialog
      open={endSessionDialogIsOpen}
      onOpenChange={(open) => setEndSessionDialogIsOpen(open)}
    >
      <DialogContent className="flex flex-col gap-5">
        <DialogHeader className="flex flex-col gap-5">
          <div className="bg-secondary w-fit mx-auto rounded-full text-primary p-3">
            <Pause className="size-10" />
          </div>
          <DialogTitle className="max-w-xs text-center mx-auto leading-5">
            Are you sure you want to end this practice session?
          </DialogTitle>
          <DialogDescription className="text-center ">
            You will see a summary of this session.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between items-center gap-3">
          <Link
            href="/sessions/temp"
            className={cn([
              buttonVariants({ variant: "outline" }),
              "flex-1 rounded-full text-primary hover:text-primary/80 border-2 border-primary hover:border-primary/80 cursor-pointer",
            ])}
          >
            Yes
          </Link>
          <DialogClose
            className={cn([
              buttonVariants({ variant: "default" }),
              "flex-1 rounded-full cursor-pointer",
            ])}
          >
            No, continue session
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
