"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { contact } from "@/data/contact";
import { AtomNavLink } from "@/components/atoms/AtomNavLink";
import { AtomLink } from "@/components/atoms/AtomLink";
import styles from "./OrgMobileMenu.module.scss";

interface OrgMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrgMobileMenu({ isOpen, onClose }: OrgMobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (menuRef.current) {
      gsap.set(menuRef.current, { yPercent: -100, display: "none" });
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!menuRef.current) return;

    const navLinks = menuRef.current.querySelectorAll(
      `.${styles["nav-link-wrapper"]}`,
    );
    const bottomLinks = menuRef.current.querySelectorAll(
      `.${styles["footer-link"]}`,
    );

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    if (isOpen) {
      gsap.set(menuRef.current, { display: "block" });
      tl.to(menuRef.current, { yPercent: 0, duration: 0.8 }, 0)
        .fromTo(
          navLinks,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
          },
          0.3,
        )
        .fromTo(
          bottomLinks,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "power3.out",
          },
          0.5,
        );
    } else {
      tl.to(
        navLinks,
        { y: -80, duration: 0.4, stagger: 0.04, ease: "power3.in" },
        0,
      )
        .to(
          bottomLinks,
          { y: -30, duration: 0.3, stagger: 0.02, ease: "power3.in" },
          0,
        )
        .to(menuRef.current, { yPercent: -100, duration: 0.7 }, 0.2)
        .set(navLinks, { y: 60, opacity: 0 })
        .set(bottomLinks, { y: 20, opacity: 0 })
        .set(menuRef.current, { display: "none" });
    }

    return () => {
      tl.kill();
    };
  }, [isOpen]);

  return (
    <div className={styles["org-mobile-menu"]} ref={menuRef}>
      <div className={styles["menu-inner"]}>
        <div className={styles["menu-center"]}>
          <div className={styles["nav-link-wrapper"]}>
            <AtomNavLink to="/" variant="menu" onClick={onClose}>
              Home
            </AtomNavLink>
          </div>
          <div className={styles["nav-link-wrapper"]}>
            <AtomNavLink to="/works" variant="menu" onClick={onClose}>
              Works
            </AtomNavLink>
          </div>
          <div className={styles["nav-link-wrapper"]}>
            <AtomNavLink to="/about" variant="menu" onClick={onClose}>
              About
            </AtomNavLink>
          </div>
          <div className={styles["nav-link-wrapper"]}>
            <AtomNavLink to="/contact" variant="menu" onClick={onClose}>
              Contact
            </AtomNavLink>
          </div>
        </div>

        {contact && (
          <div className={styles["menu-bottom"]}>
            <div className={`${styles["footer-col"]} ${styles.left}`}>
              <AtomLink
                href={`mailto:${contact.email}`}
                className={styles["footer-link"]}
              >
                {contact.email}
              </AtomLink>
              <AtomLink
                href={`tel:${contact.phoneLink}`}
                className={styles["footer-link"]}
              >
                {contact.phoneDisplay}
              </AtomLink>
            </div>
            <div className={`${styles["footer-col"]} ${styles.right}`}>
              <AtomLink
                href={contact.socials?.github}
                isExternal
                className={styles["footer-link"]}
              >
                Github
              </AtomLink>
              <AtomLink
                href={contact.socials?.linkedin}
                isExternal
                className={styles["footer-link"]}
              >
                LinkedIn
              </AtomLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
