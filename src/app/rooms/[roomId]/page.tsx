import { RoomQuestions } from "@/widgets/RoomQuestions";
import Timer from "@/widgets/RoomQuestions/ui/Timer";
import { redirect } from "next/navigation";
import { getSession } from "../../../../lib";

interface RoomPageProps {
  params: {
    roomId: string;
  };
}

export default async function RoomPage({ params }: RoomPageProps) {
  // nehmen session von lib.ts  
  const session = await getSession();

  if (!session) {
    return redirect("/");
  }

  const jsonData = JSON.stringify(session, null, 2);

  const sessionData = JSON.parse(jsonData);


  return (
    <div className="w-full h-full flex justify-center items-center">
      <Timer params={params} session={sessionData} />
      <RoomQuestions params={params} session={sessionData} />
    </div>
  );
}
