'use client';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal-store';
import { DialogDescription } from '@radix-ui/react-dialog';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import qs from 'query-string';
import { useState } from 'react';

export const LeaveServerModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const params = useParams();

  const { server } = data;

  const isModalOpen = isOpen && type === 'leaveServer';

  const onClick = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: `/api/servers/${params.serverId}`,
      });
      await axios.delete(url);
      setIsLoading(false);
      router.refresh();
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="overflow-hidden bg-white p-0 text-primary dark:bg-[#303338]">
          <DialogHeader className="px-6 pt-8">
            <DialogTitle className="text-start text-2xl font-bold text-muted-foreground dark:text-[#F2F3F5]">
              Leave &apos;{server?.name}&apos;
            </DialogTitle>
            <DialogDescription className="text-start text-muted-foreground text-zinc-500 dark:text-[#B5BAC0]">
              Are you sure you want to leave {server?.name}? You won&apos;t be
              able to join this server until you are re-invited.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row justify-start gap-x-2 p-3 dark:bg-[#2A2D31]">
            <DialogClose asChild>
              <Button
                type="button"
                variant="link"
                className="text-muted-foreground"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={isLoading}
              variant="destructive"
              type="button"
              size="lg"
              className="bg-[#DA363C]"
              onClick={() => onClick()}
            >
              {isLoading ? (
                <Loader2 className="mr-2 w-[85px] animate-spin" />
              ) : (
                <>Leave Server</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
