'use client'
import {signOut} from 'next-auth/react'
export default function Home() {
  return (
    <>
    <p className="font-bold bg-red-800">PROYECTO BASE</p>
      <button className="bg-white text-black px-4 py-2 rounded-md mt-4"
          onClick={() => signOut()}
      >
          Logout
      </button>
    </>
  );
}