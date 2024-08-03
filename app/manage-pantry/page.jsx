"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import Pantry from "@components/Pantry";

export default function Page() {
  const { data: session, status } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (session) {
      setIsLoggedIn(true);
    }
  }, [session]);

  return (
    <div>
      <Pantry />
    </div>
  );
}
