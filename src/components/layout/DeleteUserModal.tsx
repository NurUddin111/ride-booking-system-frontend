import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { DeleteUserModalProps } from "@/types/user";

import { useState } from "react";

const DeleteUserModal = ({ deleteUserHandler, id }: DeleteUserModalProps) => {
  const [confirmText, setConfirmText] = useState("");

  const handleDelete = () => {
    console.log(id);
    deleteUserHandler(id);
    setConfirmText("");
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold">Delete Book</DialogTitle>
        <DialogDescription className="text-red-600 mt-1">
          Type <span className="font-bold">CONFIRM</span> to delete your
          account.
        </DialogDescription>
      </DialogHeader>

      <div className="mt-4">
        <Input
          placeholder='Type "CONFIRM" here'
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
        />
      </div>

      <DialogFooter className="mt-6 flex justify-end gap-2">
        <DialogClose asChild>
          <Button variant="outline" className="bg-green-700 text-white">
            Cancel
          </Button>
        </DialogClose>
        <Button
          onClick={handleDelete}
          disabled={confirmText !== "CONFIRM"}
          className="bg-red-800 text-white hover:bg-red-700"
        >
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default DeleteUserModal;
