import CollaborativeRoom from "@/components/CollaborativeRoom";
import { getDocument } from "@/lib/actions/room.actions";
import { getClerkUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Document = async ({ params: { id } }: SearchParamProps) => {
  const clerkUser = await currentUser();
  if (!clerkUser || !clerkUser.emailAddresses || clerkUser.emailAddresses.length === 0) {
    redirect("/sign-in");
    return;
  }

  const userEmail = clerkUser.emailAddresses[0]?.emailAddress;
if (!userEmail) {
  redirect("/sign-in");
  return;
}

  const room = await getDocument({
    roomId: id,
    userId: userEmail,
  });

  if (!room) redirect("/");
  

  const userIds = Object.keys(room.usersAccesses);
  const users = await getClerkUsers({ userIds });

  const usersData = users.map((user: User | null | undefined) => {
    
    if (!user || !user.email) {
      console.warn("User without an email found:", user);
      return null;
    }
  
    return{
    ...user,
    userType: room.usersAccesses[user.email]?.includes("room:write")
      ? "editor"
      : "viewer",
  }
  }).filter(Boolean)

  const currentUserType = room.usersAccesses[
    clerkUser.emailAddresses[0].emailAddress
  ]?.includes("room:write")
    ? "editor"
    : "viewer";

  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom
        roomId={id}
        roomMetadata={room.metadata}
        users={usersData}
        currentUserType={currentUserType}
      />
    </main>
  );
};

export default Document;
