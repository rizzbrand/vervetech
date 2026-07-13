"use client";
import { useEffect, useRef } from "react";

const IMAGE_COUNT = 10;
const DIRECTION_DELAY = 20;

const BouncingShapes = ({
  className = "bouncing-shapes",
  shapeClassName = "bouncing-shape",
  size = 260,
  speed = 2.4,
  edgeOffset = -32,
}) => {
  const containerRef = useRef(null);
  const animationIdRef = useRef(null);
  const shapeRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isDesktop = window.innerWidth >= 1000;
    let shapeElement = null;

    const preloadImages = () =>
      Promise.all(
        Array.from({ length: IMAGE_COUNT }, (_, index) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = resolve;
            img.src = `/objects/obj-${index + 1}.png`;
          });
        })
      );

    const stopAnimation = () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }

      if (shapeElement?.parentNode) {
        shapeElement.parentNode.removeChild(shapeElement);
        shapeElement = null;
      }

      if (shapeRef.current?.parentNode) {
        shapeRef.current.parentNode.removeChild(shapeRef.current);
        shapeRef.current = null;
      }

      container.querySelectorAll(`.${shapeClassName}`).forEach((el) => {
        el.parentNode?.removeChild(el);
      });
    };

    const startAnimation = async () => {
      if (!isDesktop) return;

      stopAnimation();
      await preloadImages();
      stopAnimation();

      const rect = container.getBoundingClientRect();
      shapeElement = document.createElement("div");
      shapeElement.className = shapeClassName;
      shapeElement.setAttribute("aria-hidden", "true");
      container.appendChild(shapeElement);
      shapeRef.current = shapeElement;

      let posX = Math.max(0, rect.width / 2 - size / 2);
      let posY = Math.max(0, rect.height / 2 - size / 2);
      let velX = (Math.random() > 0.5 ? 1 : -1) * speed;
      let velY = (Math.random() > 0.5 ? 1 : -1) * speed;
      let currentImageIndex = 1;
      let canChangeDirection = true;

      shapeElement.style.width = `${size}px`;
      shapeElement.style.height = `${size}px`;
      shapeElement.style.backgroundImage = `url(/objects/obj-${currentImageIndex}.png)`;
      shapeElement.style.left = `${posX}px`;
      shapeElement.style.top = `${posY}px`;

      const changeImage = () => {
        currentImageIndex = (currentImageIndex % IMAGE_COUNT) + 1;
        shapeElement.style.backgroundImage = `url(/objects/obj-${currentImageIndex}.png)`;
      };

      const lockDirection = () => {
        canChangeDirection = false;
        window.setTimeout(() => {
          canChangeDirection = true;
        }, DIRECTION_DELAY);
      };

      const animate = () => {
        if (!shapeElement?.parentNode || !isDesktop) {
          stopAnimation();
          return;
        }

        const bounds = container.getBoundingClientRect();
        posX += velX;
        posY += velY;

        const leftEdge = edgeOffset;
        const rightEdge = bounds.width - size + Math.abs(edgeOffset);
        const topEdge = edgeOffset;
        const bottomEdge = bounds.height - size + Math.abs(edgeOffset);

        if (posX <= leftEdge || posX >= rightEdge) {
          if (canChangeDirection) {
            velX = -velX;
            changeImage();
            posX = posX <= leftEdge ? leftEdge : rightEdge;
            lockDirection();
          }
        }

        if (posY <= topEdge || posY >= bottomEdge) {
          if (canChangeDirection) {
            velY = -velY;
            changeImage();
            posY = posY <= topEdge ? topEdge : bottomEdge;
            lockDirection();
          }
        }

        shapeElement.style.left = `${posX}px`;
        shapeElement.style.top = `${posY}px`;
        animationIdRef.current = requestAnimationFrame(animate);
      };

      animationIdRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      const wasDesktop = isDesktop;
      isDesktop = window.innerWidth >= 1000;

      if (isDesktop && !wasDesktop) {
        startAnimation();
      } else if (!isDesktop && wasDesktop) {
        stopAnimation();
      }
    };

    window.addEventListener("resize", handleResize);

    if (isDesktop) {
      startAnimation();
    }

    return () => {
      stopAnimation();
      window.removeEventListener("resize", handleResize);
    };
  }, [edgeOffset, shapeClassName, size, speed]);

  return <div className={className} ref={containerRef} aria-hidden="true" />;
};

export default BouncingShapes;
