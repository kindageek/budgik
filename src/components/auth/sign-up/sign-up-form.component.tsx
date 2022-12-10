import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { trpc } from "../../../utils/trpc";
import Input from "../../input/input.component";

interface FormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<FormInputs>();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutateAsync } = trpc.auth.signup.useMutation();

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    const res = await mutateAsync({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    if (res.status === 201) {
      router.push("/auth/signin");
    } else {
      setErrorMessage(res.message);
    }
  };

  return (
    <div className="w-full rounded-lg bg-slate-50 shadow sm:max-w-md md:mt-0 xl:p-0">
      <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
        <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Sign Up
        </h1>
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: "Required" }}
            render={({ field }) => {
              return (
                <Input
                  label="Full Name"
                  type="text"
                  id="name"
                  placeholder="full name"
                  required
                  error={!!errors.name}
                  errorMessage={errors?.name?.message?.toString()}
                  {...field}
                />
              );
            }}
          />
          <Controller
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
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: "Required",
              validate: (value: string) => {
                if (watch("password") != value) {
                  return "Passwords do not match";
                }
              },
            }}
            render={({ field }) => {
              return (
                <Input
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  placeholder="********"
                  required
                  error={!!errors.confirmPassword}
                  errorMessage={errors?.confirmPassword?.message?.toString()}
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
            className="w-full rounded-lg bg-secondary-default px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-secondary-dark focus:outline-none focus:ring-4 focus:ring-secondary-light disabled:bg-gray-300 disabled:hover:bg-gray-300"
          >
            Sign up
          </button>
          <p className="text-sm font-light text-gray-500">
            Have an account?{" "}
            <Link
              href="/auth/signin"
              className="font-medium text-secondary-default hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
