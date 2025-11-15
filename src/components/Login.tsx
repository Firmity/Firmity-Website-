"use client";

import React, { useState } from "react";
import { Menu, MenuItem, HoveredLink } from "./ui/Navbar";

export function Login() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className="relative"
      onMouseLeave={() => setActive(null)} // ← dropdown won’t flicker
    >
      <div className="flex items-center">
        <Menu setActive={setActive}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Login"
            href="#"
            className="text-white text-lg font-semibold hover:text-blue-400 transition tracking-wide"
          />
        </Menu>
      </div>

      {active === "Login" && (
        <div
          className="
            absolute right-[-27px] mt-0.5
            bg-white/10 backdrop-blur-xl
            border border-white/20
            shadow-xl rounded-xl
            p-4 w-56
            z-[200]
            text-sm
            animate-fadeIn
          "
        >
          <div className="flex flex-col space-y-3 text-white">
            <HoveredLink href="https://account.ufirm.in/Account/Login">
              Client Login
            </HoveredLink>

            <HoveredLink href="https://admin.urest.in:8097/">
              Employee Login
            </HoveredLink>

            <HoveredLink href="https://account.ufirm.in/Account/Login">
              Facility Manager Login
            </HoveredLink>
          </div>
        </div>
      )}
    </div>
  );
}
