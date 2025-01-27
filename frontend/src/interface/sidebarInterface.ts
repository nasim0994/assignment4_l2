import { ReactNode } from "react";

export interface ISidebarItem {
  icon: ReactNode;
  title: string;
  path?: string;
  subMenu?: {
    title: string;
    path: string;
    subSubMenu?: { title: string; path: string }[];
  }[];
}

export interface ISidebarSubItem {
  icon?: React.ReactNode;
  title: string;
  path?: string;
  subSubMenu?: { title: string; path: string }[];
}
