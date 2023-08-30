"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import UserModalCard from "@/components/UI/UserModalCard";
import { adminHeaderNavLinks, homeHeaderNavLinks } from "@/constants";
import { activeLink } from "./utils/activeLink";

export default function Header({ role }: { role: string }) {
  const currentPath = usePathname();

  const links = () => {
    if (role === "ADMIN") {
      return adminHeaderNavLinks;
    } else {
      return homeHeaderNavLinks;
    }
  };

  return (
    <header className="responsive border-b-[2px] border-slate-3">
      <div className="responsive_wrapper flex items-center justify-between">
        <h1 className="">
          <Link href={"/"}>MOVEA</Link>
        </h1>
        <nav className="flex gap-12 px-6">
          {links().map((link, index) => {
            return (
              <Link
                key={index}
                href={link.url}
                className={`whitespace-nowrap ${activeLink(
                  link.url,
                  currentPath
                )}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <UserModalCard role={role} />
      </div>
    </header>
  );
}
