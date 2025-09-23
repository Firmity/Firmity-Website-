"use client";

import React from "react";
import { motion } from "framer-motion";
import Link, { LinkProps } from "next/link";
import Image from "next/image";

// const transition = {
//   type: "spring",
//   mass: 0.5,
//   damping: 11.5,
//   stiffness: 100,
//   restDelta: 0.001,
//   restSpeed: 0.001,
// } as const;


type MenuItemProps = {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  href: string;
  //description?: string;
  children?: React.ReactNode;
};

export const MenuItem: React.FC<MenuItemProps> = ({
  setActive,
  active,
  item,
  href,
  // description,
  children,
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative text-center">
      <Link href={href}>
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-white text-sm"
      >
        {item}
      </motion.p>
      </Link>

      {/* {active === item && description && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-4 py-2 rounded-xl bg-white/10 text-sm text-white dark:text-white backdrop-blur-md border border-white/20 shadow-md whitespace-nowrap"
        >
          {description}
        </motion.div>
      )} */}

      {active === item && children && (
        <motion.div
          // initial={{ opacity: 0, scale: 0.85, y: 10 }}
          // animate={{ opacity: 1, scale: 1, y: 0 }}
          // transition={transition}
        >
          <div className="absolute ">
            <motion.div
              // transition={transition}
              layoutId="active"
              className="bg-black/30 dark:bg-black/30  border border-white/[0.2] dark:border-white/[0.2] shadow-xl"
            >
              <motion.div layout className="p-4">
                {children}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

type MenuProps = {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
};

export const Menu: React.FC<MenuProps> = ({ setActive, children }) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-white/[0.2] dark:bg-black/25 dark:border-white/[0.2] bg-black/25 shadow-input flex justify-center space-x-14 px-4 py-4"
    >
      {children}
    </nav>
  );
};

type ProductItemProps = {
  title: string;
  description: string;
  href?: string;
  src: string;
  onClick?: () => void;
};

export const ProductItem: React.FC<ProductItemProps> = ({
  title,
  description,
  href,
  src,
  onClick,
}) => {
  const content = (
    <div className="flex space-x-8 space-y-8">
      <Image
        src={src}
        width={130}
        height={110}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl max-w-[130px] max-h-[90px]"
      />
      <div>
        <h4 className="text-lg mb-1 text-white dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-300 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </div>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="w-full text-left">
        {content}
      </button>
    );
  }

  return (
    <Link href={href || "#"} className="w-full">
      {content}
    </Link>
  );
};

type HoveredLinkProps = LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: React.ReactNode;
  };

export const HoveredLink: React.FC<HoveredLinkProps> = ({
  children,
  href,
}) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-neutral-200 dark:text-neutral-200 hover:text-blue-500  text-center"
    >
      {children}
    </Link>
  );
};