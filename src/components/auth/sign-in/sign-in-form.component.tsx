import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import Input from "../../input/input.component";

interface FormInputs {
  email: string;
  password: string;
}

const SignInForm: React.FC = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputs>();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    const status = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    if (status?.ok) {
      router.push("/dashboard");
    } else {
      setErrorMessage(status?.error ?? null);
    }
  };

  const handleGoogleAuth = () => {
    signIn("google", { callbackUrl: "https://budgik.vercel.app/dashboard" });
  };

  return (
    <div className="w-full rounded-lg bg-slate-50 shadow sm:max-w-md md:mt-0 xl:p-0">
      <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
        <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Sign In
        </h1>
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* <Controller
            name="email"
            control={control}
            rules={{ required: "Required" }}
            render={({ field }) => {
              return (
                <Input
                  label="Email"
                  type="email"
                  id="email"
                  placeholder="email"
                  required
                  error={!!errors.email}
                  errorMessage={errors?.email?.message?.toString()}
                  {...field}
                />
              );
            }}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: "Required" }}
            render={({ field }) => {
              return (
                <Input
                  label="Password"
                  type="password"
                  id="password"
                  placeholder="********"
                  required
                  error={!!errors.password}
                  errorMessage={errors?.password?.message?.toString()}
                  {...field}
                />
              );
            }}
          />
          {errorMessage && errorMessage?.length > 0 ? (
            <h3 className="text-md rounded-md border border-red-500 bg-rose-100 py-1 text-center font-bold text-red-500">
              {errorMessage}
            </h3>
          ) : null}
          <button
            disabled
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:bg-gray-300 disabled:hover:bg-gray-300"
          >
            Sign in
          </button>
          <p className="my-1 text-center text-sm font-light text-gray-500">
            or
          </p> */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            className="flex w-full items-center justify-center rounded-lg border bg-gray-50 px-5 py-2.5 text-center text-sm font-medium text-black hover:border-indigo-400 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          >
            <FcGoogle size={20} className="mr-4" />
            Sign in with Google
          </button>
          {/* <p className="text-sm font-light text-gray-500">
            Don’t have an account yet?{" "}
            <Link
              href="/auth/signup"
              className="font-medium text-indigo-600 hover:underline"
            >
              Sign up
            </Link>
          </p> */}
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
