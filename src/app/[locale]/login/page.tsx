"use client";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import Image from "next/image";
import { ZodError, ZodFormattedError } from "zod";
import { emailSchema } from "@/utils/schemas";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
const LogIn = () => {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [listErrors, setError] =
    useState<ZodFormattedError<{ email: string }, string>>();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const form = emailSchema.safeParse(email);
    if (!form.success) {
      console.error(form.error.format());
      return setError(form.error.format());
    }
    try {
      await signIn("credentials", {
        redirect: true,
        email,
        password,
        callbackUrl: "/home",
      });
    } catch (error) {
      console.error(error);
      if (error instanceof Error && error.message === "exists") {
        console.log("User already exists");
      }
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            className="w-8 h-8 mr-2"
            width={32}
            height={32}
            src="/img/logo.png"
            alt="logo"
          />
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Log in
            </h1>
            {urlError === "CredentialsSignin" && (
              <span className="block text-xs mt-2 text-red-500">
                Wrong credentials
              </span>
            )}
            <form
              className="space-y-4 md:space-y-6 flex flex-col"
              onSubmit={handleSubmit}
              noValidate
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.currentTarget.value)}
                  className={`bg-gray-50 border 
                      text-gray-900 sm:text-sm rounded-lg
                      block w-full p-2.5 dark:bg-gray-700  ${
                        listErrors?.email
                          ? "border-red-600 focus:ring-red-700 focus:border-red-700"
                          : "dark:border-gray-600 border-gray-300  focus:ring-gray-600 focus:border-gray-600"
                      }
                       dark:placeholder-gray-400 dark:text-white
                        `}
                  required
                />
                {listErrors?.email?._errors.map((error) => (
                  <span className="block text-xs mt-2 text-red-500" key={error}>
                    {error}
                  </span>
                ))}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.currentTarget.value)}
                  className={`bg-gray-50 border
                      text-gray-900 sm:text-sm rounded-lg
                      block w-full p-2.5 dark:bg-gray-700
                          dark:border-gray-600 border-gray-300  focus:ring-gray-600 focus:border-gray-600
                       dark:placeholder-gray-400 dark:text-white
                        `}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full self-center text-white bg-slate-600 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Log in
              </button>
              <div className="inline-flex items-center justify-center w-full">
                <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                <span className="absolute px-3 font-medium text-gray-900 bg-white dark:bg-gray-800 -translate-x-1/2 left-1/2 dark:text-white">
                  or
                </span>
              </div>
              <button
                type="button" onClick={() => signIn("github", {redirect: true, callbackUrl: "/"})}
                className="py-2 px-4 max-w flex justify-center items-center bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="mr-2"
                  viewBox="0 0 1792 1792"
                >
                  <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
                </svg>
                Sign in with GitHub
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                <Link
                  href="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogIn;
