
import Channel from '@/components/Channel';
import Login from '@/components/Login';
import { getCookie } from 'cookies-next';

export default function Home({ channel, title, loggedIn }) {
  if (!loggedIn) {
    return <Login />;
  }

  return (
    <main>
      <Channel channel={channel} title={title} />
    </main>
  );
}
export async function getServerSideProps({ req, res }) {
  const cookiesData = getCookie('auth', { req, res });
  const loggedIn = cookiesData === 'true';

  if (!loggedIn) {
    return {
      props: {
        loggedIn,
      },
    };
  }

  const arenaChannelUrl = process.env.FICUS_ARENA_CHANNEL;
  const channelId = arenaChannelUrl.split('/').pop();
  const channel = await fetch(`https://api.are.na/v2/channels/${channelId}?sort=position&direction=asc&per=100`);
  const channelJson = await channel.json();

  return {
    props: {
      channel: channelJson,
      title: process.env.FICUS_TITLE || false,
      loggedIn,
    },
  };
}