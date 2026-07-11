"use client";
import "./Hero.css";
import { useRef, useEffect } from "react";
import Copy from "@/components/Copy/Copy";
import { isInitialLoad } from "@/components/Preloader/Preloader";
import { heroServices } from "./heroServices";
import { useViewTransition } from "@/hooks/useViewTransition";

const ServiceCard = ({ service, onNavigate }) => (
  <a
    href={service.route}
    className="hero-carousel-card"
    onClick={(e) => {
      e.preventDefault();
      onNavigate(service.route);
    }}
  >
    <img src={service.img} alt={service.name} />
    <span className="hero-carousel-card-name">{service.name}</span>
  </a>
);

const Hero = () => {
  const marqueeRef = useRef(null);
  const isPausedRef = useRef(false);
  const animationRef = useRef(null);
  const { navigateWithTransition } = useViewTransition();
  const marqueeServices = [...heroServices, ...heroServices];

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const tick = () => {
      if (!isPausedRef.current && marquee) {
        marquee.scrollLeft += 0.6;

        const loopPoint = marquee.scrollWidth / 2;
        if (marquee.scrollLeft >= loopPoint) {
          marquee.scrollLeft = 0;
        }
      }

      animationRef.current = requestAnimationFrame(tick);
    };

    animationRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const scrollCarousel = (direction) => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const card = marquee.querySelector(".hero-carousel-card");
    const track = marquee.querySelector(".hero-marquee-track");
    const gap = track
      ? parseFloat(getComputedStyle(track).gap) || 20
      : 20;
    const scrollAmount = card ? card.offsetWidth + gap : 320;

    isPausedRef.current = true;

    marquee.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });

    window.setTimeout(() => {
      isPausedRef.current = false;
    }, 600);
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-top">
          <div className="hero-headline">
            <Copy animateOnScroll={false} delay={isInitialLoad ? 4.5 : 0.75}>
              <h1>
                <span className="hero-headline-line">Come build the</span>
                <span className="hero-headline-line hero-headline-line--nowrap">
                  next great company
                </span>
              </h1>
            </Copy>
          </div>

          <div className="hero-aside">
            <Copy animateOnScroll={false} delay={isInitialLoad ? 4.8 : 1.15}>
              <p>
                Rizzbrand brings ideas, capital, and talent together — partnering
                with founders and creators to build the best ideas into great
                companies.
              </p>
            </Copy>

            <a
              href="/onboarding"
              className="hero-cta"
              onClick={(e) => {
                e.preventDefault();
                navigateWithTransition("/onboarding");
              }}
            >
              Get started
            </a>
          </div>
        </div>

        <div className="hero-carousel-section">
          <div className="hero-carousel-nav">
            <button
              type="button"
              className="hero-carousel-btn"
              aria-label="Previous service"
              onClick={() => scrollCarousel("prev")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              className="hero-carousel-btn"
              aria-label="Next service"
              onClick={() => scrollCarousel("next")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          <div
            className="hero-marquee"
            ref={marqueeRef}
            onMouseEnter={() => {
              isPausedRef.current = true;
            }}
            onMouseLeave={() => {
              isPausedRef.current = false;
            }}
          >
            <div className="hero-marquee-track">
              {marqueeServices.map((service, index) => (
                <ServiceCard
                  key={`${service.name}-${index}`}
                  service={service}
                  onNavigate={navigateWithTransition}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
