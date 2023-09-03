"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import UserModalCard from "@/components/UI/UserModalCard";
import { adminHeaderNavLinks, homeHeaderNavLinks } from "@/constants";
import { activeLink } from "./utils/activeLink";

export default function Header({ role }: { role: string }) {
  const currentPath = usePathname();
  const pattern = /\/form.*/;

  const getPathName = () => {
    const parts = currentPath.split("/");
    const lastPart = parts[parts.length - 1];
    return lastPart;
  };

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
          <Link href={role === "ADMIN" ? "/admin/movie" : "/"}>
            MOVEA{role === "ADMIN" ? <b className="font-thin">admin</b> : ""}
          </Link>
        </h1>
        <nav className="flex gap-12 px-6 lg:[&>*:nth-child(n+3)]:hidden md:[&>*:nth-child(n+3)]:hidden sm:[&>*:nth-child(n+2)]:hidden">
          {links().map((link, index) => {
            return (
              <Link
                key={index}
                href={link.url}
                className={`inline whitespace-nowrap ${activeLink(
                  link.url,
                  currentPath
                )}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-6">
          {role === "ADMIN" &&
          currentPath !== "/admin" &&
          !pattern.test(currentPath) ? (
            <Link
              href={currentPath + "/form"}
              className="button-primary text-xs capitalize min-w-[167px]"
            >
              Upload {getPathName()}
            </Link>
          ) : null}
          <UserModalCard role={role} />
        </div>
      </div>
    </header>
  );
}
