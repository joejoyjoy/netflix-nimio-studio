import React from "react";
import { redirect } from 'next/navigation'
import Loader from "@/components/UI/Loader";

export default function Admin() {
  redirect('/admin/movie')

  return <Loader />;
}
