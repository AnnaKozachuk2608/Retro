import { redirect } from "next/navigation";
import { getSession } from "../../../../lib";
import ResultsLayout from "@/widgets/Results/ui/ResultsLayout";

interface ResultsPageProps {
  params: {
    roomId: string;
  };
}

export default async function ResultsPage({ params }: ResultsPageProps) {
  // bekommen session von lib.ts
  const session = await getSession();

  if (!session) {
    return redirect(`/`);
  }

  const jsonData = JSON.stringify(session, null, 2);

  const sessionData = JSON.parse(jsonData);

  return <ResultsLayout session={sessionData} roomId={params.roomId} />;
}
