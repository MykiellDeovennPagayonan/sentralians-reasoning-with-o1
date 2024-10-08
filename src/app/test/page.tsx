import PhysicsSimulator from "@/components/chat/interactive-components/PhysicsSimulator";

const objects = [
  {
    weight: 5,
    velocity: { x: 200, y: 0 },
    position: { x: 200, y: 150 },
  },
  {
    weight: 10,
    velocity: { x: -200, y: 0 },
    position: { x: 500, y: 150 },
  },
  // Add more objects as needed
];

export default function Home() {
  return (
    <div className="h-screen w-screen bg-grid-black/[0.1] pt-4 flex">
      <PhysicsSimulator objects={objects}/>
    </div>
  );
}
