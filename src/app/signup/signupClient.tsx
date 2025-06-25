"use client";

// import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "../../../public/logo_w_bg.webp";
// import { Account, Client } from "appwrite";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../../firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";

function SignupPage() {
  const [emailValue, setEmailValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [passlValue, setPassValue] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const nxt: string | null = searchParams.get("nxt");

  // const client = new Client();
  // client.setProject("67f8e0b60036e5cf80aa");
  // const account = new Account(client);

  // const data = {
  //   email: emailValue,
  //   username: usernameValue,
  //   pass: passlValue,
  // };

  // const createAccount = async () => {
  //   const result = await account.create(usernameValue, emailValue, passlValue);
  //   console.log(result);
  // };

  // const loginUser = async () => {
  //   try {
  //     const res = await axios.post(
  //       "https://8e6c-2409-40d1-80-1b4e-18fe-74af-7dd5-86f7.ngrok-free.app/api/register",
  //       data
  //     );
  //     if (res.status === 201) {
  //       alert("User registered successfully!");
  //     } else {
  //       alert(`Couldn't register user!`);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const createAccount = async () => {
    const res1 = await createUserWithEmailAndPassword(
      auth,
      emailValue,
      passlValue
    );
    if (res1) {
      let a = 1;
      await updateProfile(res1.user, {
        displayName: usernameValue,
      }).then(() => (a = 2));
      if (a == 2) {
        let b = 1;
        await setDoc(doc(db, "users", res1.user.uid), {
          username: usernameValue,
          email: emailValue,
        }).then(() => (b = 2));
        if (b == 2) {
          router.push(nxt === "adrs" ? "/cart" : "/");
        }
      }
    } else {
      console.log("something went wrong");
    }
  };

  return (
    <div className="py-10">
      <div className="w-full flex justify-center">
        <Image src={logo} alt="logo" className="w-[10rem]" />
      </div>
      <div className="w-full py-10 flex flex-col gap-4 justify-center items-center">
        <input
          type="text"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          className={`border-gray-300 focus:outline-blue-300 rounded-2xl border-2 px-4 py-2 w-1/2 max-w-md`}
          placeholder="Email..."
        />
        <input
          type="text"
          value={usernameValue}
          onChange={(e) => setUsernameValue(e.target.value)}
          className={`border-gray-300 focus:outline-blue-300 rounded-2xl border-2 px-4 py-2 w-1/2 max-w-md`}
          placeholder="Username..."
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
          onClick={createAccount}
        >
          Sign up
        </button>
      </div>
      <p className="w-full text-center text-sm font-extralight text-gray-500">
        Already have an account?{" "}
        <Link className="text-blue-400" href={"/login"}>
          Log in
        </Link>
      </p>
    </div>
  );
}

export default SignupPage;
