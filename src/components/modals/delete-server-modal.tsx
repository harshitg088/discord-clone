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
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogDescription } from '@radix-ui/react-dialog';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import qs from 'query-string';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

export const DeleteServerModal = () => {
  const formSchema = z.object({
    text: z
      .string()
      .min(1, {
        message: "You did't enter the server name correctly",
      })
      .refine((text) => text === server?.name, {
        message: "You did't enter the server name correctly",
      }),
  });
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const params = useParams();

  const { server } = data;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
    },
  });

  const isModalOpen = isOpen && type === 'deleteServer';

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async () => {
    try {
      const url = qs.stringifyUrl({
        url: `/api/servers/${params?.serverId}/delete`,
      });
      await axios.delete(url);
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
              Delete &apos;{server?.name}&apos;
            </DialogTitle>
            <DialogDescription className="rounded-sm border bg-[#EFB032] p-3 text-start text-muted-foreground text-zinc-500 dark:text-[#F2F3F5]">
              Are you sure you want to delete {server?.name}? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-8 px-6">
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-[#B5BAC0]">
                        Enter Server Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="border-0 bg-zinc-300/50 text-primary focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-[#1E1F22]"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                  type="submit"
                  size="lg"
                  className="bg-[#DA363C]"
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 w-[85px] animate-spin" />
                  ) : (
                    <>Delete Server</>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
