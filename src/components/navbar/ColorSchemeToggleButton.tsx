'use client';

import { toggleScheme } from "@/utils/colorScheme";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export default function ColorSchemeToggleButton() {
const router = useRouter();
const toggle = async () => {
   await toggleScheme();
   router.refresh();
 };
  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      className="py-1 px-3 bg-zinc-900 dark:bg-zinc-100 rounded-full w-10 h-10"
      onClick={toggle}
    >
      <span className="inline-block text-sm dark:hidden text-zinc-100">
        <FontAwesomeIcon icon={faMoon}></FontAwesomeIcon>
      </span>
      <span className="hidden text-sm dark:inline-block text-zinc-800">
      <FontAwesomeIcon icon={faSun}></FontAwesomeIcon>
      </span>
    </button>
  );
}