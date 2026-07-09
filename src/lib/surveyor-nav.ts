// Single source of truth for surveyor navigation tabs, shared by the mobile
// bottom bar (BottomNav) and the desktop top bar (SurveyorTopNav). Each tab is a
// real route so Awards/Settings are their own screens (not in-page anchors).

import { Home, ClipboardList, Award, Settings, type LucideIcon } from "lucide-react";

export type NavTab = { href: string; label: string; icon: LucideIcon };

export const SURVEYOR_TABS: NavTab[] = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/my-surveys", label: "Surveys", icon: ClipboardList },
  { href: "/awards", label: "Awards", icon: Award },
  { href: "/settings", label: "Settings", icon: Settings },
];
