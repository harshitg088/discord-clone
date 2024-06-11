import MobileToggle from '@/components/mobile-toggle';
import { Hash } from 'lucide-react';
import { UserAvatar } from '../user-avatar';

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: 'channel' | 'conversation';
  imageUrl?: string;
}

const ChatHeader = ({ serverId, name, type, imageUrl }: ChatHeaderProps) => {
  return (
    <div className="text-md flex h-12 items-center border-b-2 border-neutral-200 px-3 font-semibold dark:border-neutral-800">
      <MobileToggle serverId={serverId} />
      {type === 'channel' && (
        <Hash className="ml-2 mr-2 h-5 w-5 text-zinc-500 dark:text-zinc-400" />
      )}
      {type === 'conversation' && (
        //@ts-ignore
        <UserAvatar src={imageUrl} className="mr-2 h-8 w-8 md:h-8 md:w-8" />
      )}
      <p className="text-md font-semibold text-black dark:text-white">{name}</p>
    </div>
  );
};

export default ChatHeader;
