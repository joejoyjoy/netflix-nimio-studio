"use client";

import { useState, useRef, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { GoTriangleUp } from "react-icons/go";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { HiOutlineChevronRight } from "react-icons/hi";
import { AuthContext } from "@/context/AuthContext";

export default function UserModalCard() {
  const { user, isLoggedIn, isLoading } = useContext(AuthContext);
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
    <>
      <button
        className="w-9 h-9 p-0 rounded-full overflow-hidden"
        onClick={() => setPopperOpen(!popperOpen)}
      >
        <Image
          src={
            user ? user?.image : "/assets/IMG/profile-placeholder-160x160.webp"
          }
          alt={user ? user?.name + " profile picture" : "User profile picture"}
          width={36}
          height={36}
          className="w-9 h-9 object-cover rounded-full"
        />
      </button>
      <div className="text-white bg-red-400 rounded-full">Hello</div>

      <div className="bg-gray-300">Hello</div>
    </>
  );
}
