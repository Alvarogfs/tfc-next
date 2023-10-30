"use client";
import React from "react";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const CookieConsent = () => {
  const router = useRouter();
  const consentCookie = async () => {
    setCookie("cookieConsent", true, {
      path: "/",
    });
    router.refresh();
  };
  return (
    <div className="flex justify-between items-center gap-2 dark:bg-gray-700 bg-gray-100 px-4 py-2 fixed bottom-0 left-0 w-full">
      <p className="text-sm text-gray-700 dark:text-white">
        We use cookies to ensure you get the best experience on our website.
      </p>
      <button
        onClick={consentCookie}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Accept
      </button>
    </div>
  );
};

export default CookieConsent;
