'use client';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Search } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface ServerSearchProps {
  data: {
    label: string;
    type: 'channel' | 'member';
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

const ServerSearch = ({ data }: ServerSearchProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => {
      document.removeEventListener('keydown', down);
    };
  }, []);

  const onClick = ({
    id,
    type,
  }: {
    id: string;
    type: 'channel' | 'member';
  }) => {
    setOpen(false);

    if (type === 'member') {
      return router.push(`/servers/${params?.serverId}/conversations/${id}`);
    }
    if (type === 'channel') {
      return router.push(`/servers/${params?.serverId}/channels/${id}`);
    }
  };
  return (
    <>
      <button className="group flex w-full items-center gap-x-2 rounded-md px-2 py-2 transition hover:bg-zinc-700/10 dark:bg-zinc-700/50">
        <Search className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
        <p className="text-sm font-semibold text-zinc-500 transition group-hover:text-zinc-300 dark:text-zinc-400">
          Search
        </p>
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘+K</span>
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all channels and members" />
        <CommandList>
          <CommandEmpty>
            <p className="text-center text-zinc-500 dark:text-zinc-400">
              No results found
            </p>
          </CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data?.length) return null;
            return (
              <CommandGroup key={label} heading={label}>
                {data.map(({ id, icon, name }) => {
                  return (
                    <CommandItem
                      key={id}
                      onSelect={() => onClick({ id, type })}
                    >
                      {icon}
                      <span>{name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default ServerSearch;
