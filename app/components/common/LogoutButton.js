"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/app/components/common/Button";
import { logout } from "@/utils/auth/authApi";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);

    try {
      await logout();
      router.replace("/sign-in");
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      type="button"
      variant="secondary"
      isLoading={isLoading}
      onClick={handleLogout}
      className="w-full"
    >
      Sign out
    </Button>
  );
}
