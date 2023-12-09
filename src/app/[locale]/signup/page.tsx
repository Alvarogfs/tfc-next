"use client";
import { registerUser } from "@/utils/actions";
import { formSchema } from "@/utils/schemas";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { ZodFormattedError } from "zod";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorExist, setErrorExist] = useState(false);
  const [listErrors, setError] =
    useState<
      ZodFormattedError<
        { name: string; email: string; password: string },
        string
      >
    >();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setErrorExist(false);
    const form = formSchema.safeParse({
      name,
      email,
      password,
    });
    if (!form.success) {
      console.error(form.error.format());
      return setError(form.error.format());
    }
    try {
      await registerUser(email, name, password);
      signIn("credentials", {
        redirect: true,
        email,
        password,
        callbackUrl: "/home",
      });
    } catch (error) {
      if (error instanceof Error && error.message === "exists") {
        console.log("User already exists");
        setErrorExist(true);
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
              Sign up a new account
            </h1>
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
                {errorExist && (
                  <span className="block text-xs mt-2 text-red-500">
                    Email already exists
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.currentTarget.value)}
                  className={`bg-gray-50 border 
                   text-gray-900 sm:text-sm rounded-lg
                   block w-full p-2.5 dark:bg-gray-700  ${
                     listErrors?.name
                       ? "border-red-600 focus:ring-red-700 focus:border-red-700"
                       : "dark:border-gray-600 border-gray-300  focus:ring-gray-600 focus:border-gray-600"
                   }
                    dark:placeholder-gray-400 dark:text-white
                     `}
                  required
                />
                {listErrors?.name?._errors.map((error) => (
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
                  block w-full p-2.5 dark:bg-gray-700  ${
                    listErrors?.password
                      ? "border-red-600 focus:ring-red-700 focus:border-red-700"
                      : "dark:border-gray-600 border-gray-300  focus:ring-gray-600 focus:border-gray-600"
                  }
                   dark:placeholder-gray-400 dark:text-white
                    `}
                  required
                />
                {listErrors?.password?._errors.map((error) => (
                  <span className="block text-xs mt-2 text-red-500" key={error}>
                    {error}
                  </span>
                ))}
              </div>
              <button
                type="submit"
                className="w-1/2 self-center text-white bg-slate-600 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                <Link
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
