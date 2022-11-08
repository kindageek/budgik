import Link from "next/link";
import React from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import Input from "../../input/input.component";

interface FormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data: FormInputs) => {
    console.log(data);
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
            rules={{ required: "Required" }}
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
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          >
            Sign up
          </button>
          <p className="text-sm font-light text-gray-500">
            Have an account?{" "}
            <Link
              href="/auth/signin"
              className="font-medium text-indigo-600 hover:underline"
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
