"use client";

import { useState, useRef, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { GoTriangleUp } from "react-icons/go";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { HiOutlineChevronRight } from "react-icons/hi";
import { AuthContext } from "@/context/AuthContext";

export default function UserModalCard({ role }: { role?: string }) {
  const { user, isLoading } = useContext(AuthContext);
  const [popperOpen, setPopperOpen] = useState(false);
  let popperRef = useRef<HTMLInputElement>(null);

  const handleAction = () => {
    if (user) signOut();
    if (!user) signIn();
  };

  useEffect(() => {
    const modal = document.querySelector("#userCard");
    if (!popperOpen) {
      setTimeout(() => {
        if (modal) {
          modal.classList.add("invisible");
        }
      }, 300);
    }
  }, [popperOpen]);

  useEffect(() => {
    const handler = (e: any) => {
      if (popperRef.current != null) {
        if (!popperRef.current.contains(e.target)) {
          setPopperOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center relative">
        <div className="w-9 h-9 p-0 rounded-full drop-shadow-md">
          <Image
            src={"/assets/GIF/giphy.gif"}
            alt="Loading"
            width={36}
            height={36}
            className="rounded-full w-9 h-9 object-cover"
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center relative" ref={popperRef}>
      <button
        className="w-9 h-9 p-0 rounded-full drop-shadow-md z-20"
        onClick={() => setPopperOpen(!popperOpen)}
      >
        <Image
          src={
            user ? user?.image : "/assets/IMG/profile-placeholder-160x160.webp"
          }
          alt={user ? user?.name + " profile picture" : "User profile picture"}
          width={36}
          height={36}
          className="rounded-full w-9 h-9 object-cover"
          priority
        />
      </button>
      <section
        id="userCard"
        className={`absolute top-[54px] right-0 flex flex-col items-end w-[375px] z-40 before:content-[""] before:rotate-45 ${
          popperOpen ? "popper-active" : "popper-inactive"
        }`}
      >
        <div className="w-[calc(375px-2rem)] rounded-xl shadow-2xl bg-slate-5 overflow-hidden">
          <div className="flex justify-center absolute -top-[12px] right-0 w-8 p-0 m-0 text-slate-3">
            <GoTriangleUp />
          </div>
          <div className="flex items-center gap-3 py-3 px-5 border-b-[1px] border-slate-2 transition duration-150">
            <Image
              src={
                user
                  ? user?.image
                  : "/assets/IMG/profile-placeholder-160x160.webp"
              }
              alt={
                user ? user?.name + " profile picture" : "User profile picture"
              }
              width={48}
              height={48}
              className="rounded-full w-11 h-11 object-cover drop-shadow-md"
              priority
            />
            <span>
              <p className="text-md">Hey, {user ? user?.name : "Guest"}!</p>
              {user && <p className="text-sm font-normal">{user?.email}</p>}
            </span>
          </div>
          <span className="flex flex-col gap-1 p-2">
            {user?.role === "ADMIN" && (
              <Link
                href={role !== "ADMIN" ? "/admin" : "/"}
                className="popper-card group"
              >
                {role !== "ADMIN" ? "Admin Panel" : "Back To Home"}
                <HiOutlineChevronRight
                  size={20}
                  className="group-hover:animate-bounce"
                />
              </Link>
            )}
            <div onClick={handleAction} className="popper-card group">
              <span className="flex gap-1">
                {user ? "Logout" : "Login"}
                {user ? (
                  <IoLogOutOutline size={23} />
                ) : (
                  <IoLogInOutline size={23} />
                )}
              </span>
              <HiOutlineChevronRight
                size={20}
                className="group-hover:animate-bounce"
              />
            </div>
          </span>
        </div>
      </section>
    </div>
  );
}
