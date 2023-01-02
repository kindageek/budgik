import React from "react";
import { signIn } from 'next-auth/react';
import { FcGoogle } from "react-icons/fc";

const GoogleSignIn: React.FC = () => {
  const handleGoogleAuth = () => {
    signIn("google", { callbackUrl: `${window.location.origin}/dashboard` });
  };

  return (
    <button
      type="button"
      onClick={handleGoogleAuth}
      className="flex w-full items-center justify-center rounded-lg border bg-gray-50 px-5 py-2.5 text-center text-sm font-medium text-black hover:border-indigo-400 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-indigo-300"
    >
      <FcGoogle size={20} className="mr-4" />
      Sign in with Google
    </button>
  );
};

export default GoogleSignIn;
