"use client";
import "./Preloader.css";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

gsap.registerPlugin(useGSAP);

export const PRELOADER_ENABLED = false;
export let isInitialLoad = PRELOADER_ENABLED;

const LOADER_DURATION = 3.5;
const EXIT_DURATION = 0.75;

const Preloader = () => {
  const preloaderRef = useRef(null);
  const progressRef = useRef(null);
  const percentRef = useRef(null);
  const [showPreloader, setShowPreloader] = useState(isInitialLoad);
  const [loaderAnimating, setLoaderAnimating] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    return () => {
      isInitialLoad = false;
    };
  }, []);

  useEffect(() => {
    if (!lenis) return;

    if (loaderAnimating) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [lenis, loaderAnimating]);

  useGSAP(
    () => {
      if (!showPreloader) return;

      setLoaderAnimating(true);

      const waitForFonts = async () => {
        try {
          await document.fonts.ready;
          await new Promise((resolve) => setTimeout(resolve, 100));
        } catch {
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
      };

      const runLoader = async () => {
        await waitForFonts();

        const progress = { value: 0 };

        const tl = gsap.timeline({
          delay: 0.15,
          onComplete: () => {
            setTimeout(() => {
              setLoaderAnimating(false);
              setShowPreloader(false);
            }, 100);
          },
        });

        tl.to(progress, {
          value: 100,
          duration: LOADER_DURATION,
          ease: "power2.inOut",
          onUpdate: () => {
            const pct = Math.round(progress.value);

            if (progressRef.current) {
              progressRef.current.style.width = `${pct}%`;
            }

            if (percentRef.current) {
              percentRef.current.textContent = `${pct}%`;
            }
          },
        })
          .to({}, { duration: 0.25 })
          .to(".preloader", {
            opacity: 0,
            duration: EXIT_DURATION,
            ease: "power2.inOut",
            onStart: () => {
              gsap.set(".preloader", { pointerEvents: "none" });
            },
          });
      };

      runLoader();
    },
    { scope: preloaderRef, dependencies: [showPreloader] }
  );

  if (!showPreloader) {
    return null;
  }

  return (
    <div className="preloader" ref={preloaderRef}>
      <div className="preloader-inner">
        <div className="preloader-bar">
          <div className="preloader-bar-fill" ref={progressRef} />
        </div>

        <div className="preloader-meta">
          <span className="preloader-meta-left">
            <svg
              className="preloader-play-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M1 0.5L7 4L1 7.5V0.5Z" />
            </svg>
            Loading — <span ref={percentRef}>0%</span>
          </span>

          <span className="preloader-meta-right">
            Rizzbrand Technologies booting
          </span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
