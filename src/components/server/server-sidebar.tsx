import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import ServerHeader from './server-header';

interface ServerSidebarProps {
  serverId: string;
}

const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return auth().redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: 'asc',
        },
      },

      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: 'asc',
        },
      },
    },
  });

  //   const textChannel = server?.channels.filter(
  //     (channel) => channel.type == ChannelType.TEXT,
  //   );
  //   const audioChannel = server?.channels.filter(
  //     (channel) => channel.type == ChannelType.AUDIO,
  //   );
  //   const videoChannel = server?.channels.filter(
  //     (channel) => channel.type == ChannelType.VIDEO,
  //   );
  //   const members = server?.members.filter(
  //     (member) => member.profileId !== profile.id,
  //   );

  if (!server) {
    return redirect('/');
  }
  const role = server.members.find(
    (member) => member.profileId === profile.id,
  )?.role;
  return (
    <div className="flex h-full w-full flex-col bg-[#F2F3F5] text-primary dark:bg-[#282D31]">
      <ServerHeader server={server} role={role} />
    </div>
  );
};

export default ServerSidebar;
