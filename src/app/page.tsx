import AIChat from "@/components/chat/AIChat";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Navbar from "@/components/layout/Navbar";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions)

  console.log(session?.user.id,'from home')
  return (
    <>
      <Navbar />
      <div className="h-screen w-screen bg-grid-black/[0.1] pt-4 flex">
        <ResizablePanelGroup
          direction="horizontal"
          className="w-full"
        >
          <ResizablePanel defaultSize={100}>
            <AIChat />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={0}>
            <div className="w-full h-full bg-black">

            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}
