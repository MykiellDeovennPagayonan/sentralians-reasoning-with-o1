import AIChat from "@/components/chat/AIChat";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Navbar from "@/components/layout/Navbar";

export default function Home() {
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
