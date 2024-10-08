/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useRef, useEffect, useState } from 'react';
import { Engine, Render, World, Bodies, Body, Vector, Runner, Events } from 'matter-js';

type Velocity = {
  x: number; // Pixels per second
  y: number; // Pixels per second
};

type Position = {
  x: number; // Starting x position in pixels
  y: number; // Starting y position in pixels
};

type PhysicsObject = {
  id?: string;
  weight: number; // In kilograms or any metric unit
  velocity: Velocity;
  position: Position; // Starting position
};

type PhysicsSimulatorProps = {
  objects: PhysicsObject[];
};

const PhysicsSimulator: React.FC<PhysicsSimulatorProps> = ({ objects }) => {
  const scene = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const renderRef = useRef<Render | null>(null);
  const runnerRef = useRef<Runner | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const matterObjectsRef = useRef<{ body: any; size: number; weight: number; initialPosition: Position }[]>([]);

  useEffect(() => {
    // Initialize engine with no gravity for top-down view
    const engine = Engine.create({
      gravity: { x: 0, y: 0 },
    });
    engineRef.current = engine;

    // Define canvas dimensions
    const width = 800;
    const height = 600;

    // Create renderer
    const render = Render.create({
      element: scene.current!,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: '#f0f0f0',
      },
    });
    renderRef.current = render;
    Render.run(render);

    // Add walls to prevent objects from leaving the scene
    const walls = [
      // Top
      Bodies.rectangle(width / 2, -25, width, 50, { isStatic: true, restitution: 1, friction: 0 }),
      // Bottom
      Bodies.rectangle(width / 2, height + 25, width, 50, { isStatic: true, restitution: 1, friction: 0 }),
      // Left
      Bodies.rectangle(-25, height / 2, 50, height, { isStatic: true, restitution: 1, friction: 0 }),
      // Right
      Bodies.rectangle(width + 25, height / 2, 50, height, { isStatic: true, restitution: 1, friction: 0 }),
    ];
    World.add(engine.world, walls);

    // Add objects
    const matterObjects = objects.map((obj) => {
      const size = Math.sqrt(obj.weight) * 10; // Adjust size scaling as needed
      const body = Bodies.circle(
        obj.position.x, // Starting x position
        obj.position.y, // Starting y position
        size,
        {
          restitution: 0, // Perfect bounciness
          friction: 0, // No surface friction
          frictionAir: 0, // No air friction
          slop: 0, // Prevents objects from sticking together
          inertia: Infinity, // Prevent rotation if desired
          render: {
            fillStyle: '#3490dc',
          },
        }
      );
      // Set initial velocity (Matter.js uses pixels per tick, assuming 60 ticks per second)
      Body.setVelocity(body, { x: obj.velocity.x / 60, y: obj.velocity.y / 60 }); // Convert to pixels per tick
      World.add(engine.world, body);
      return { body, size, weight: obj.weight, initialPosition: obj.position };
    });

    matterObjectsRef.current = matterObjects;

    // Custom rendering for velocity arrows and weight labels
    Events.on(render, 'afterRender', () => {
      const context = render.context;
      if (!context) return;
      // Draw velocity arrows and weight labels
      matterObjectsRef.current.forEach(({ body, size, weight }) => {
        const pos = body.position;
        const vel = body.velocity;

        // Draw velocity arrow
        const velocityMagnitude = Vector.magnitude(vel);
        const arrowLength = velocityMagnitude * 20; // Scale for visibility

        if (arrowLength > 0) {
          const angle = Math.atan2(vel.y, vel.x);
          context.beginPath();
          context.moveTo(pos.x, pos.y);
          context.lineTo(pos.x + arrowLength * Math.cos(angle), pos.y + arrowLength * Math.sin(angle));

          // Draw arrowhead
          const headLength = 10; // Length of arrowhead
          context.lineTo(
            pos.x + (arrowLength - headLength) * Math.cos(angle - Math.PI / 6),
            pos.y + (arrowLength - headLength) * Math.sin(angle - Math.PI / 6)
          );
          context.moveTo(pos.x + arrowLength * Math.cos(angle), pos.y + arrowLength * Math.sin(angle));
          context.lineTo(
            pos.x + (arrowLength - headLength) * Math.cos(angle + Math.PI / 6),
            pos.y + (arrowLength - headLength) * Math.sin(angle + Math.PI / 6)
          );
          context.strokeStyle = '#ff0000';
          context.lineWidth = 2;
          context.stroke();
        }

        // Draw weight label
        context.font = '12px Arial';
        context.fillStyle = '#000';
        context.textAlign = 'center';
        context.fillText(weight.toString(), pos.x, pos.y - size - 10);
      });
    });

    // Initial render for preview
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: width, y: height },
    });

    return () => {
      // Clean up on unmount
      Render.stop(render);
      World.clear(engine.world, false);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
      if (runnerRef.current) {
        Runner.stop(runnerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Initialize once on mount

  useEffect(() => {
    if (isRunning) {
      // Create and run the runner
      const runner = Runner.create({
        // Optionally, you can set options like delta
      });
      runnerRef.current = runner;
      Runner.run(runner, engineRef.current!);
    } else {
      // Stop the runner
      if (runnerRef.current) {
        Runner.stop(runnerRef.current);
        runnerRef.current = null;
      }

      // Reset positions and velocities for preview
      matterObjectsRef.current.forEach((obj, index) => {
        Body.setPosition(obj.body, obj.initialPosition); // Use initial positions
        Body.setVelocity(obj.body, { x: objects[index].velocity.x / 60, y: objects[index].velocity.y / 60 });
        Body.setAngularVelocity(obj.body, 0);
        Body.setAngle(obj.body, 0);
      });
      Engine.update(engineRef.current!, 1000 / 60); // Update engine to reflect reset
    }
  }, [isRunning, objects]);

  const handlePlay = () => {
    setIsRunning((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center">
      <div
        ref={scene}
        className="border border-gray-300"
        style={{ width: '800px', height: '600px' }}
      ></div>
      <button
        onClick={handlePlay}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {isRunning ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default PhysicsSimulator;