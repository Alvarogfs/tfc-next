import { auth } from "@/utils/auth";
import Link from "next/link";
import AuthDropdown from "./AuthDropdown";

const AuthButton = async () => {
  const session = await auth();
  if(session){
    const user = session.user as {
      name: string;
      email: string
      image: string
  }
    return <AuthDropdown {...user}></AuthDropdown>
    }
  return (
    <Link
    href={"/api/auth/signin"}
      className="text-white bg-amber-700 hover:bg-amber-400 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-amber-400 dark:hover:bg-amber-500 dark:focus:ring-amber-600"
    >
      Get started
    </Link>
  );
};

export default AuthButton;
