'use client';
import { useModal } from '@/hooks/use-modal-store';
import { cn } from '@/lib/utils';
import { Channel, ChannelType, MemberRole, Server } from '@prisma/client';
import { Edit, Hash, Lock, Mic, Trash, Video } from 'lucide-react';
import { useParams } from 'next/navigation';
import ActionTooltip from '../action-tooltip';

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ServerChannel = ({ channel, server, role }: ServerChannelProps) => {
  const params = useParams();
  const { onOpen } = useModal();
  const Icon = iconMap[channel.type];

  return (
    <button
      onClick={() => {}}
      className={cn(
        'group mb-1 flex w-full items-center gap-x-2 rounded-md px-2 py-2 transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50',
        params?.channelId === channel.id && 'bg-zinc-700 dark:bg-zinc-700',
      )}
    >
      <Icon className="h-4 w-4 flex-shrink-0 text-zinc-500 dark:text-zinc-400" />
      <p
        className={cn(
          'dark:text=zinc-500 line-clamp-1 text-sm font-semibold text-zinc-500 transition group-hover:text-zinc-600 dark:group-hover:text-zinc-300',
          params?.channelId === channel.id &&
            'text-primary dark:text-zinc-200 dark:group-hover:text-white',
        )}
      >
        {channel.name}
      </p>
      {channel.name !== 'general' && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip label="Edit">
            <Edit
              onClick={() => onOpen('editChannel', { server, channel })}
              className="hidden h-4 w-4 text-zinc-500 transition hover:text-zinc-600 group-hover:block dark:text-zinc-400 dark:hover:text-zinc-300"
            />
          </ActionTooltip>
          <ActionTooltip label="Delete">
            <Trash
              onClick={() => onOpen('deleteChannel', { server, channel })}
              className="hidden h-4 w-4 text-zinc-500 transition hover:text-zinc-600 group-hover:block dark:text-zinc-400 dark:hover:text-zinc-300"
            />
          </ActionTooltip>
        </div>
      )}
      {channel.name === 'general' && (
        <Lock className="ml-auto h-4 w-4 text-zinc-500 dark:text-zinc-400" />
      )}
    </button>
  );
};

export default ServerChannel;
