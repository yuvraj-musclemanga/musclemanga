"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import logo from "../../../public/logo_w_bg.webp";
import { auth } from "../../../firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

function SignupPage() {
  const [emailValue, setEmailValue] = useState("");
  const [passlValue, setPassValue] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const nxt: string | null = searchParams.get("nxt");

  const loginUser = async () => {
    const res = await signInWithEmailAndPassword(auth, emailValue, passlValue);
    if (res) {
      if (nxt === "adrs") {
        router.replace("/addresses");
      } else {
        router.back();
      }
    }
  };

  return (
    <div className="py-10">
      <div className="w-full flex justify-center">
        <Image src={logo} alt="logo" className="w-[10rem]" />
      </div>
      <div className="w-full py-10 flex flex-col gap-2 justify-center items-center">
        <input
          type="text"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          className={`border-gray-300 focus:outline-blue-300 rounded-2xl border-2 px-4 py-2 w-1/2 max-w-md`}
          placeholder="Email..."
        />
        <input
          type="password"
          value={passlValue}
          onChange={(e) => setPassValue(e.target.value)}
          className={`border-gray-300 focus:outline-blue-300 rounded-2xl border-2 px-4 py-2 w-1/2 max-w-md`}
          placeholder="Password..."
        />
        <button
          className="bg-blue-300 text-white text-xl font-semibold rounded-2xl px-4 py-2 hover:bg-blue-400 cursor-pointer hover:scale-105 transition-all active:scale-90 active:bg-blue-400"
          onClick={loginUser}
        >
          Log in
        </button>
      </div>
      <p className="w-full text-center text-sm font-extralight text-gray-500">
        Need an account?{" "}
        <Link
          className="text-blue-400"
          href={{
            pathname: "/signup",
            query: nxt === "adrs" ? { nxt: "adrs" } : {},
          }}
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default SignupPage;
