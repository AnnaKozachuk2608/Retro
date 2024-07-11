import QuestionsLayout from "@/widgets/QuestionsList/ui/QuestionsLayout";
import { getSession } from "../../../../lib";
import { redirect } from "next/navigation";

interface CreateRoomPageProps {
  params: {
    createId: string;
  };
}

export default async function CreateRoomPage({ params }: CreateRoomPageProps) {
  // nehmen session von lib.ts
  const session = await getSession();

  if (!session) {
    return redirect("/");
  }

  const jsonData = JSON.stringify(session, null, 2);

  const sessionData = JSON.parse(jsonData);

  return <QuestionsLayout params={params} session={sessionData} />;
}
