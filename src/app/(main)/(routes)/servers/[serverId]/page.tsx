export default function Page({ params }: { params: { serverId: string } }) {
  return <div>My Post: {params.serverId}</div>;
}
