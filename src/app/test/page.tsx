import DrawingCanvas from "@/components/chat/interactive-components/DrawingCanvas";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-grid-black/[0.1] pt-4 flex">
      <DrawingCanvas />
    </div>
  );
}
