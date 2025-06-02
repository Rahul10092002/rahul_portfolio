"use client";

import type React from "react";

import { Link } from "react-scroll";

interface ScrollLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  smooth?: boolean;
  duration?: number;
  offset?: number;
}

export default function ScrollLink({
  to,
  children,
  className,
  smooth = true,
  duration = 500,
  offset = -70,
}: ScrollLinkProps) {
  return (
    <Link
      to={to}
      spy={true}
      smooth={smooth}
      duration={duration}
      offset={offset}
      className={className}
    >
      {children}
    </Link>
  );
}
