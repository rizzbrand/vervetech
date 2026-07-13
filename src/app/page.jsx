"use client";
import "./home.css";
import Hero from "@/components/Hero/Hero";
import Difference from "@/components/Difference/Difference";
import Method from "@/components/Method/Method";
import Footer from "@/components/Footer/Footer";
import Preloader, { PRELOADER_ENABLED } from "@/components/Preloader/Preloader";
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
    });

    const onLoad = () => ScrollTrigger.refresh(true);
    window.addEventListener("load", onLoad, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <>
      {PRELOADER_ENABLED && <Preloader />}
      <Hero />
      <Difference />
      <Method />
      <Footer />
    </>
  );
};

export default Page;
