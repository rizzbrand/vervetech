"use client";
import "./Footer.css";
import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import { IoMail } from "react-icons/io5";
import Copy from "../Copy/Copy";
import BouncingShapes from "@/components/BouncingShapes/BouncingShapes";

const Footer = () => {
  const [torontoTime, setTorontoTime] = useState("");

  useEffect(() => {
    const updateTorontoTime = () => {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Toronto",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTorontoTime(formatter.format(new Date()));
    };

    updateTorontoTime();
    const timeInterval = setInterval(updateTorontoTime, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  return (
    <footer className="site-footer">
      <BouncingShapes
        className="footer-shapes"
        shapeClassName="footer-shape"
        size={280}
        speed={2.2}
      />

      <div className="container site-footer-inner">
        <div className="footer-header-content">
          <div className="footer-header">
            <Copy animateOnScroll={true} delay={0.2}>
              <h2>Let&apos;s build something that scales</h2>
            </Copy>
          </div>

          <div className="footer-link">
            <Button
              animateOnScroll={true}
              delay={0.5}
              variant="light"
              icon={IoMail}
              href="/contact"
            >
              Say Hello
            </Button>
          </div>
        </div>

        <div className="footer-byline">
          <div className="footer-time">
            <p>
              Toronto, ON <span>{torontoTime}</span>
            </p>
          </div>

          <div className="footer-author">
            <p>Sky Land Technology</p>
          </div>

          <div className="footer-copyright">
            <p>&copy; Sky Land Technology</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
