import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import HeaderClient from "./Headerclient";

export default function Header() {
  return <HeaderServer />;
}

async function HeaderServer() {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const user = await currentUser();

  if (!user) {
    return <HeaderClient convexUser={null} />;
  }

  let convexUser = null;
  try {
    convexUser = await convex.query(api.users.getUser, {
      userId: user.id,
    });
  } catch (error) {
    console.error("Convex query error:", error);
  }

  return <HeaderClient convexUser={convexUser} />;
}
