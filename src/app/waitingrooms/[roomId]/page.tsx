import { LoginForm } from "@/features/LoginForm";
import { getSession } from "../../../../lib";
import { PlayersList } from "@/widgets/PlayersList";
import { LoginFormByLink } from "@/features/LoginFormByLink";

interface RoomPageProps {
  params: {
    roomId: string;
  };
}

export default async function WaitingRoomPage({ params }: RoomPageProps) {
  // nehmen session von lib.ts
  const session = await getSession();

  if (!session) {
    return <LoginFormByLink params={params} />;
  }

  const jsonData = JSON.stringify(session, null, 2);

  const sessionData = JSON.parse(jsonData);

  return <PlayersList params={params} session={sessionData} />;
}
