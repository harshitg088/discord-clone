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
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { useState } from 'react';

export const DeleteChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { server, channel } = data;

  const isModalOpen = isOpen && type === 'deleteChannel';

  const onSubmit = async () => {
    try {
      setIsLoading(!isLoading);
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      });
      await axios.delete(url);
      router.refresh();
      onClose();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(!isLoading);
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
              Delete Channel
            </DialogTitle>
            <DialogDescription className="p-3 text-start text-muted-foreground text-zinc-500 dark:text-[#F2F3F5]">
              Are you sure you want to delete{' '}
              <span className="font-bold">#{channel?.name}</span>? This action
              cannot be undone.
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
              onClick={onSubmit}
              variant="destructive"
              type="button"
              size="lg"
              className="bg-[#DA363C]"
            >
              {isLoading ? (
                <Loader2 className="mr-2 w-[85px] animate-spin" />
              ) : (
                <>Delete Channel</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
