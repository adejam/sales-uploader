import React from 'react'
import Link from "next/link";

function Layouts({children}: any) {
  return (
    <div className="h-screen">
      <header className="flex fixed top">
        <Link href={"/"}>
          <a className="font-semibold mx-2">Home</a>
        </Link>
        <Link href={"/upload"}>
          <a className="font-semibold mx-2">Upload</a>
        </Link>
      </header>
      <main className="flex h-full">
        {children}
      </main>
      <footer className="flex justify-center fixed bottom-0">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          AdejamTech
        </a>
      </footer>
    </div>
  )
}

export default Layouts