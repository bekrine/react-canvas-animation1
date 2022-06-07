import { useEffect, useRef, useState } from "react";
import "./styles.css";

export default function App() {
  const canvasRef = useRef();
  const contextRef = useRef();
  const reqIdRef = useRef();
  const ballRef = useRef({
    x: 50,
    y: 50,
    size: 20,
    dx: 2,
    dy: 1
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 300;
    canvas.height = 300;
    const context = canvas.getContext("2d");
    contextRef.current = context;
    requestAnimationFrame(drowingcurcile);
  }, []);

  const drowingcurcile = () => {
    const { x, y, size } = ballRef.current;
    contextRef.current.clearRect(0, 0, 300, 300);
    updateBall();
    contextRef.current.beginPath();
    contextRef.current.arc(x, y, size, 0, Math.PI * 2);
    contextRef.current.fillStyle = "red";
    contextRef.current.fill();
    requestAnimationFrame(drowingcurcile);
  };

  const updateBall = () => {
    const ball = ballRef.current;
    ball.y += ball.dy;
    ball.x += ball.dx;
    if (ball.x > 280 || ball.x - ball.size < 0) {
      ball.dx *= -1;
    }
    if (ball.y > 280 || ball.y - ball.size < 0) {
      ball.dy *= -1;
    }
  };

  const renderFame = () => {
    drowingcurcile();
    updateBall();
  };
  const tick = () => {
    if (!canvasRef.current) return;
    renderFame();
    requestAnimationFrame(tick);
  };

  return <canvas ref={canvasRef} />;
}
