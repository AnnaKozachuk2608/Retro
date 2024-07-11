import { LoginForm } from "@/features/LoginForm";
import { CreateRoom } from "@/widgets/CreateRoom";
import { getSession } from "../../../lib";

export default async function Home() {
  // nehmen Session von lib.ts
  const session = await getSession();

  if (!session) {
    return <LoginForm />;
  }

  const jsonData = JSON.stringify(session, null, 2);

  const sessionData = JSON.parse(jsonData);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <CreateRoom session={sessionData} />
    </div>
  );
}
