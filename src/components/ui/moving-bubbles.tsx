
import { useEffect, useRef } from "react";

interface BubbleProps {
  numBubbles?: number;
  minSize?: number;
  maxSize?: number;
  minSpeed?: number;
  maxSpeed?: number;
  colors?: string[];
  opacity?: number;
}

export function MovingBubbles({
  numBubbles = 20,
  minSize = 20,
  maxSize = 60,
  minSpeed = 0.5,
  maxSpeed = 2,
  colors = ['#674cd7', '#33ccff', '#9b87f5'],
  opacity = 0.2,
}: BubbleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initial resize
    resizeCanvas();

    // Listen for window resize
    window.addEventListener('resize', resizeCanvas);

    // Create bubbles
    const bubbles: {
      x: number;
      y: number;
      radius: number;
      color: string;
      speedX: number;
      speedY: number;
    }[] = [];

    for (let i = 0; i < numBubbles; i++) {
      const radius = Math.random() * (maxSize - minSize) + minSize;
      bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed,
        speedY: (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed,
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw bubbles
      bubbles.forEach((bubble) => {
        // Move bubble
        bubble.x += bubble.speedX;
        bubble.y += bubble.speedY;

        // Bounce off walls
        if (bubble.x < bubble.radius || bubble.x > canvas.width - bubble.radius) {
          bubble.speedX *= -1;
        }
        if (bubble.y < bubble.radius || bubble.y > canvas.height - bubble.radius) {
          bubble.speedY *= -1;
        }

        // Draw bubble
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = bubble.color + Math.floor(opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [numBubbles, minSize, maxSize, minSpeed, maxSpeed, colors, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}
