"use client";
import "./Menu.css";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useViewTransition } from "@/hooks/useViewTransition";
import { industriesMenuColumns } from "./industriesMenu";
import { IndustryMenuIcon } from "./industryIcons";
import { resourcesMenuItems, resourcesFeatured, resourcesSocialLinks } from "./resourcesMenu";

gsap.registerPlugin(useGSAP, SplitText);

const Menu = ({ pageRef }) => {
  const navToggleRef = useRef(null);
  const menuOverlayRef = useRef(null);
  const menuImageRef = useRef(null);
  const menuLinksWrapperRef = useRef(null);
  const linkHighlighterRef = useRef(null);
  const menuLinksRef = useRef([]);
  const menuLinkContainersRef = useRef([]);
  const openLabelRef = useRef(null);
  const closeLabelRef = useRef(null);
  const menuColsRef = useRef([]);

  const splitTextInstances = useRef([]);
  const menuColSplitTextInstances = useRef([]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);

  const lenis = useLenis();

  const { navigateWithTransition } = useViewTransition();

  const pathname = usePathname();

  const menuItems = [
    { label: "Home", route: "/" },
    { label: "Portfolio", route: "/templates" },
    { label: "Industries", route: "/industries" },
    { label: "Companies", route: "/companies" },
    { label: "Resources", route: "/studio" },
    { label: "Contact", route: "/contact" },
  ];

  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const industriesTimeoutRef = useRef(null);
  const resourcesTimeoutRef = useRef(null);

  const handleIndustriesEnter = () => {
    if (industriesTimeoutRef.current) {
      clearTimeout(industriesTimeoutRef.current);
    }
    setIsIndustriesOpen(true);
  };

  const handleIndustriesLeave = () => {
    industriesTimeoutRef.current = setTimeout(() => {
      setIsIndustriesOpen(false);
    }, 120);
  };

  const handleResourcesEnter = () => {
    if (resourcesTimeoutRef.current) {
      clearTimeout(resourcesTimeoutRef.current);
    }
    setIsResourcesOpen(true);
  };

  const handleResourcesLeave = () => {
    resourcesTimeoutRef.current = setTimeout(() => {
      setIsResourcesOpen(false);
    }, 120);
  };

  const handleNavClick = (route, e) => {
    e.preventDefault();
    const [path, hash] = route.split("#");
    const currentPath = window.location.pathname;

    if (currentPath === path && !hash) return;

    if (currentPath === path && hash) {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    navigateWithTransition(route, isMenuOpen ? toggleMenu : null);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    const currentPath = window.location.pathname;
    if (currentPath === "/") return;
    navigateWithTransition("/", isMenuOpen ? toggleMenu : null);
  };

  const renderNavLink = (item) => {
    const isActive = pathname === item.route;

    const chevron = (
      <svg
        className="nav-link-chevron"
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    );

    if (item.label === "Resources") {
      const isResourcesActive = resourcesMenuItems.some(
        ({ route }) =>
          pathname === route.split("#")[0] ||
          pathname.startsWith(route.split("#")[0])
      );

      return (
        <div
          key={item.label}
          className={`nav-dropdown${isResourcesOpen ? " nav-dropdown--open" : ""}`}
          onMouseEnter={handleResourcesEnter}
          onMouseLeave={handleResourcesLeave}
        >
          <a
            href={item.route}
            className={`nav-link nav-link--has-dropdown${isResourcesActive ? " nav-link--active" : ""}`}
            onClick={(e) => handleNavClick(item.route, e)}
          >
            <span>{item.label}</span>
            {chevron}
          </a>

          <div className="nav-dropdown-panel nav-dropdown-panel--resources">
            <div className="nav-resources-layout">
              <ul className="nav-resources-links">
                {resourcesMenuItems.map((entry) => (
                  <li key={entry.title}>
                    <a
                      href={entry.route}
                      className="nav-resources-link"
                      onClick={(e) => handleNavClick(entry.route, e)}
                    >
                      {entry.title}
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href={resourcesFeatured.route}
                className="nav-resources-featured"
                onClick={(e) => handleNavClick(resourcesFeatured.route, e)}
              >
                <div className="nav-resources-featured-media">
                  <img src={resourcesFeatured.image} alt="" />
                  <p className="nav-resources-featured-overlay">
                    {resourcesFeatured.title}
                  </p>
                </div>
                <div className="nav-resources-featured-meta">
                  <span className="nav-resources-featured-time">
                    {resourcesFeatured.readTime}
                  </span>
                  <span className="nav-resources-featured-tag">
                    {resourcesFeatured.tag}
                  </span>
                </div>
                <p className="nav-resources-featured-title">
                  {resourcesFeatured.title}
                </p>
              </a>
            </div>

            <div className="nav-resources-social">
              {resourcesSocialLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.url}
                  className="nav-resources-social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (item.label === "Industries") {
      const isIndustriesActive =
        pathname === item.route || pathname.startsWith("/industries/");

      return (
        <div
          key={item.label}
          className={`nav-dropdown${isIndustriesOpen ? " nav-dropdown--open" : ""}`}
          onMouseEnter={handleIndustriesEnter}
          onMouseLeave={handleIndustriesLeave}
        >
          <a
            href={item.route}
            className={`nav-link nav-link--has-dropdown${isIndustriesActive ? " nav-link--active" : ""}`}
            onClick={(e) => handleNavClick(item.route, e)}
          >
            <span>{item.label}</span>
            {chevron}
          </a>

          <div className="nav-dropdown-panel">
            <div className="nav-dropdown-grid">
              {industriesMenuColumns.map((column, columnIndex) => (
                <div className="nav-dropdown-col" key={`${column.label}-${columnIndex}`}>
                  <ul className="nav-dropdown-list">
                    {column.items.map((entry) => (
                      <li key={entry.title}>
                        <a
                          href={entry.route}
                          className="nav-dropdown-item"
                          onClick={(e) => handleNavClick(entry.route, e)}
                        >
                          <span className="nav-dropdown-item-head">
                            {entry.icon && (
                              <IndustryMenuIcon name={entry.icon} />
                            )}
                            <span className="nav-dropdown-item-title">
                              {entry.title}
                            </span>
                          </span>
                          <span className="nav-dropdown-item-desc">
                            {entry.description}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <a
        key={item.label}
        href={item.route}
        className={`nav-link${isActive ? " nav-link--active" : ""}`}
        onClick={(e) => handleNavClick(item.route, e)}
      >
        {item.label}
      </a>
    );
  };

  const navLinks = menuItems.filter((item) => item.route !== "/");

  const currentX = useRef(0);
  const targetX = useRef(0);
  const lerpFactor = 0.05;

  const currentHighlighterX = useRef(0);
  const targetHighlighterX = useRef(0);
  const currentHighlighterWidth = useRef(0);
  const targetHighlighterWidth = useRef(0);

  const animationFrameRef = useRef(null);

  useEffect(() => {
    return () => {
      if (industriesTimeoutRef.current) {
        clearTimeout(industriesTimeoutRef.current);
      }
      if (resourcesTimeoutRef.current) {
        clearTimeout(resourcesTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) return;

    const menuCols = menuColsRef.current;
    if (!menuCols || menuCols.length === 0) return;

    menuColSplitTextInstances.current.forEach((split) => split.revert());
    menuColSplitTextInstances.current = [];

    menuCols.forEach((col) => {
      if (!col) return;

      const elements = col.querySelectorAll("p, a");

      elements.forEach((el) => {
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

        menuColSplitTextInstances.current.push(split);

        gsap.set(split.lines, { y: "100%" });
      });
    });
  }, [isMenuOpen]);

  useGSAP(
    () => {
      const menuLinks = menuLinksRef.current;
      const menuOverlay = menuOverlayRef.current;
      const menuLinksWrapper = menuLinksWrapperRef.current;
      const linkHighlighter = linkHighlighterRef.current;
      const menuImage = menuImageRef.current;
      const container = pageRef.current;
      const menuLinkContainers = menuLinkContainersRef.current;

      splitTextInstances.current.forEach((split) => split.revert());
      splitTextInstances.current = [];

      menuLinks.forEach((link) => {
        if (!link) return;

        const chars = link.querySelectorAll("span");
        chars.forEach((char, charIndex) => {
          const split = new SplitText(char, { type: "chars" });
          splitTextInstances.current.push(split);
          split.chars.forEach((char) => {
            char.classList.add("char");
          });
          if (charIndex === 1) {
            gsap.set(split.chars, { y: "110%" });
          }
        });
      });

      gsap.set(menuImage, { y: 0, scale: 0.5, opacity: 0.25 });
      gsap.set(menuLinks, { y: "150%" });
      gsap.set(linkHighlighter, { y: "150%" });

      const defaultLinkText = menuLinksWrapper.querySelector(
        ".menu-link:first-child a span"
      );
      if (defaultLinkText) {
        const linkWidth = defaultLinkText.offsetWidth;
        linkHighlighter.style.width = linkWidth + "px";
        currentHighlighterWidth.current = linkWidth;
        targetHighlighterWidth.current = linkWidth;

        const defaultLinkTextElement = menuLinksWrapper.querySelector(
          ".menu-link:first-child"
        );
        const linkRect = defaultLinkTextElement.getBoundingClientRect();
        const menuWrapperRect = menuLinksWrapper.getBoundingClientRect();
        const initialX = linkRect.left - menuWrapperRect.left;
        currentHighlighterX.current = initialX;
        targetHighlighterX.current = initialX;
      }

      const handleMouseMove = (e) => {
        if (window.innerWidth < 1000) return;

        const mouseX = e.clientX;
        const viewportWidth = window.innerWidth;
        const menuLinksWrapperWidth = menuLinksWrapper.offsetWidth;

        const maxMoveLeft = 0;
        const maxMoveRight = viewportWidth - menuLinksWrapperWidth;

        const sensitivityRange = viewportWidth * 0.5;
        const startX = (viewportWidth - sensitivityRange) / 2;
        const endX = startX + sensitivityRange;

        let mousePercentage;
        if (mouseX <= startX) {
          mousePercentage = 0;
        } else if (mouseX >= endX) {
          mousePercentage = 1;
        } else {
          mousePercentage = (mouseX - startX) / sensitivityRange;
        }

        targetX.current =
          maxMoveLeft + mousePercentage * (maxMoveRight - maxMoveLeft);
      };

      menuLinkContainers.forEach((link) => {
        if (!link) return;

        const handleMouseEnter = () => {
          if (window.innerWidth < 1000) return;

          const linkCopy = link.querySelectorAll("a span");
          if (!linkCopy || linkCopy.length < 2) return;

          const visibleCopy = linkCopy[0];
          const animatedCopy = linkCopy[1];

          const visibleChars = visibleCopy.querySelectorAll(".char");
          gsap.to(visibleChars, {
            y: "-110%",
            stagger: 0.05,
            duration: 0.5,
            ease: "expo.inOut",
          });

          const animatedChars = animatedCopy.querySelectorAll(".char");
          gsap.to(animatedChars, {
            y: "0%",
            stagger: 0.05,
            duration: 0.5,
            ease: "expo.inOut",
          });

          const linkRect = link.getBoundingClientRect();
          const menuWrapperRect = menuLinksWrapper.getBoundingClientRect();

          targetHighlighterX.current = linkRect.left - menuWrapperRect.left;

          const linkCopyElement = link.querySelector("a span");
          targetHighlighterWidth.current = linkCopyElement
            ? linkCopyElement.offsetWidth
            : link.offsetWidth;
        };

        const handleMouseLeave = () => {
          if (window.innerWidth < 1000) return;

          const linkCopy = link.querySelectorAll("a span");
          if (!linkCopy || linkCopy.length < 2) return;

          const visibleCopy = linkCopy[0];
          const animatedCopy = linkCopy[1];

          const animatedChars = animatedCopy.querySelectorAll(".char");
          gsap.to(animatedChars, {
            y: "110%",
            stagger: 0.05,
            duration: 0.5,
            ease: "expo.inOut",
          });

          const visibleChars = visibleCopy.querySelectorAll(".char");
          gsap.to(visibleChars, {
            y: "0%",
            stagger: 0.05,
            duration: 0.5,
            ease: "expo.inOut",
          });
        };

        link.addEventListener("mouseenter", handleMouseEnter);
        link.addEventListener("mouseleave", handleMouseLeave);

        link._mouseEnterHandler = handleMouseEnter;
        link._mouseLeaveHandler = handleMouseLeave;
      });

      const handleMenuLinksWrapperMouseLeave = () => {
        const defaultLinkText = menuLinksWrapper.querySelector(
          ".menu-link:first-child"
        );
        if (!defaultLinkText) return;

        const defaultLinkTextSpan = defaultLinkText.querySelector("a span");
        if (!defaultLinkTextSpan) return;

        const linkRect = defaultLinkText.getBoundingClientRect();
        const menuWrapperRect = menuLinksWrapper.getBoundingClientRect();

        targetHighlighterX.current = linkRect.left - menuWrapperRect.left;
        targetHighlighterWidth.current = defaultLinkTextSpan.offsetWidth;
      };

      menuOverlay.addEventListener("mousemove", handleMouseMove);
      menuLinksWrapper.addEventListener(
        "mouseleave",
        handleMenuLinksWrapperMouseLeave
      );

      const animate = () => {
        currentX.current += (targetX.current - currentX.current) * lerpFactor;
        currentHighlighterX.current +=
          (targetHighlighterX.current - currentHighlighterX.current) *
          lerpFactor;
        currentHighlighterWidth.current +=
          (targetHighlighterWidth.current - currentHighlighterWidth.current) *
          lerpFactor;

        gsap.to(menuLinksWrapper, {
          x: currentX.current,
          duration: 0.3,
          ease: "power4.out",
        });

        gsap.to(linkHighlighter, {
          x: currentHighlighterX.current,
          width: currentHighlighterWidth.current,
          duration: 0.3,
          ease: "power4.out",
        });

        animationFrameRef.current = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        menuOverlay.removeEventListener("mousemove", handleMouseMove);
        menuLinksWrapper.removeEventListener(
          "mouseleave",
          handleMenuLinksWrapperMouseLeave
        );

        menuLinkContainers.forEach((link) => {
          if (!link) return;
          const mouseEnterHandler = link._mouseEnterHandler;
          const mouseLeaveHandler = link._mouseLeaveHandler;
          if (mouseEnterHandler)
            link.removeEventListener("mouseenter", mouseEnterHandler);
          if (mouseLeaveHandler)
            link.removeEventListener("mouseleave", mouseLeaveHandler);
        });

        splitTextInstances.current.forEach((split) => {
          if (split && split.revert) split.revert();
        });
        splitTextInstances.current = [];
      };
    },
    { scope: menuOverlayRef }
  );

  useEffect(() => {
    if (!lenis) return;
    if (isMenuOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [lenis, isMenuOpen]);

  const toggleMenu = () => {
    if (isMenuAnimating) return;
    setIsMenuAnimating(true);

    const container = pageRef.current;
    const menuOverlay = menuOverlayRef.current;
    const menuImage = menuImageRef.current;
    const menuLinks = menuLinksRef.current;
    const linkHighlighter = linkHighlighterRef.current;
    const menuLinksWrapper = menuLinksWrapperRef.current;
    const openLabel = openLabelRef.current;
    const closeLabel = closeLabelRef.current;
    const menuCols = menuColsRef.current;

    if (!isMenuOpen) {
      gsap.to(openLabel, {
        y: "-100%",
        duration: 1,
        ease: "power3.out",
      });

      gsap.to(closeLabel, {
        y: "-100%",
        duration: 1,
        ease: "power3.out",
      });

      gsap.to(menuOverlay, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        duration: 1.25,
        ease: "expo.out",
        onComplete: () => {
          gsap.set(".menu-link", { overflow: "visible" });

          setIsMenuOpen(true);
          setIsMenuAnimating(false);
        },
      });

      gsap.to(menuImage, {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "expo.out",
      });

      gsap.to(menuLinks, {
        y: "0%",
        duration: 1.25,
        stagger: 0.1,
        delay: 0.25,
        ease: "expo.out",
      });

      gsap.to(linkHighlighter, {
        y: "0%",
        duration: 1,
        delay: 1,
        ease: "expo.out",
      });

      menuCols.forEach((col) => {
        if (!col) return;

        const splitLines = col.querySelectorAll(".split-line");

        gsap.to(splitLines, {
          y: "0%",
          duration: 1,
          stagger: 0.05,
          delay: 0.5,
          ease: "expo.out",
        });
      });
    } else {
      gsap.to(openLabel, {
        y: "0%",
        duration: 1,
        ease: "power3.out",
      });

      gsap.to(closeLabel, {
        y: "0%",
        duration: 1,
        ease: "power3.out",
      });

      gsap.to(menuImage, {
        y: "-25svh",
        opacity: 0.5,
        duration: 1.25,
        ease: "expo.out",
      });

      menuCols.forEach((col) => {
        if (!col) return;

        const splitLines = col.querySelectorAll(".split-line");

        gsap.to(splitLines, {
          y: "-100%",
          duration: 1,
          stagger: 0,
          ease: "expo.out",
        });
      });

      gsap.to(menuOverlay, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1.25,
        ease: "expo.out",
        onComplete: () => {
          gsap.set(menuOverlay, {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          });
          gsap.set(menuLinks, { y: "150%" });
          gsap.set(linkHighlighter, { y: "150%" });
          gsap.set(menuImage, { y: "0", scale: 0.5, opacity: 0.25 });
          gsap.set(".menu-link", { overflow: "hidden" });

          menuCols.forEach((col) => {
            if (!col) return;
            const splitLines = col.querySelectorAll(".split-line");
            gsap.set(splitLines, { y: "100%" });
          });

          gsap.set(menuLinksWrapper, { x: 0 });
          currentX.current = 0;
          targetX.current = 0;

          setIsMenuOpen(false);
          setIsMenuAnimating(false);
        },
      });
    }
  };

  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/onboarding")) {
    return null;
  }

  return (
    <>
      <nav className="marketing-nav">
        <div className="nav-logo">
          <a
            href="/"
            className="nav-logo-text"
            onClick={handleLogoClick}
          >
           Sky Land Technology
          </a>
        </div>

        <div className="nav-links">
          {navLinks.map((item) => renderNavLink(item))}
        </div>

        <div className="nav-actions">
          <a
            href="/discovery"
            className="nav-cta"
            onClick={(e) => {
              e.preventDefault();
              navigateWithTransition("/discovery");
            }}
          >
            Get started
          </a>

          <div
            className="nav-toggle nav-toggle--mobile"
            ref={navToggleRef}
            onClick={toggleMenu}
          >
            <div className="nav-toggle-wrapper">
              <p ref={openLabelRef} className="open-label">
                Menu
              </p>

              <p ref={closeLabelRef} className="close-label">
                Close
              </p>
            </div>
          </div>
        </div>
      </nav>

      <div className="menu-overlay" ref={menuOverlayRef}>
        <div className="menu-content">
          <div
            className="menu-col"
            ref={(el) => {
              menuColsRef.current[0] = el;
            }}
          >
            <div className="menu-content-group">
              <p>&copy; Sky Land Technology</p>
              <p>Innovation HQ</p>
              <p>Toronto</p>
            </div>

            <div className="menu-content-group">
              <p>Edition</p>
              <p>Late Vol. 04</p>
            </div>

            <div className="menu-content-group">
              <p>Say Hello</p>
              <p>hello@skylandtechnology.com</p>
            </div>

            <div className="menu-content-group">
              <p>Hotline</p>
              <p>+47 9824 554321</p>
            </div>
          </div>
          <div
            className="menu-col"
            ref={(el) => {
              menuColsRef.current[1] = el;
            }}
          >
            <div className="menu-content-group">
              <p>Field Log</p>

              <a href="https://www.instagram.com/codegridweb/" target="_blank">
                Instagram
              </a>

              <a href="https://www.youtube.com/@codegrid" target="_blank">
                YouTube
              </a>
            </div>

            <div className="menu-content-group">
              <p>Language</p>
              <p>Human</p>
            </div>

            <div className="menu-content-group">
              <p>Credits</p>
              <p>Built by Sky Land Technology</p>
              <p>Edition 2025</p>
            </div>
          </div>
        </div>

        <div className="menu-img">
          <img ref={menuImageRef} src="/menu/menu_img.jpg" alt="" />
        </div>

        <div className="menu-links-wrapper" ref={menuLinksWrapperRef}>
          {menuItems.map((item, index) => (
            <div
              key={item.label}
              className="menu-link"
              ref={(el) => {
                menuLinkContainersRef.current[index] = el;
              }}
              onClick={(e) => {
                e.preventDefault();
                const currentPath = window.location.pathname;
                if (currentPath === item.route) {
                  if (isMenuOpen) {
                    toggleMenu();
                  }
                  return;
                }
                navigateWithTransition(
                  item.route,
                  isMenuOpen ? toggleMenu : null
                );
              }}
            >
              <a
                href={item.route}
                ref={(el) => {
                  menuLinksRef.current[index] = el;
                }}
              >
                <span>{item.label}</span>
                <span>{item.label}</span>
              </a>
            </div>
          ))}

          <div className="link-highlighter" ref={linkHighlighterRef}></div>
        </div>
      </div>
    </>
  );
};

export default Menu;
