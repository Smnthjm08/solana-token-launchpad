import { Outlet } from "react-router-dom";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Appbar() {
  return (
    <div className="flex z-50 flex-col min-h-screen">
      <header className="flex sticky top-0 justify-between bg-black items-center py-4 px-8 text-white border-b-2 border-primary z-50">
        <div className="text-xl font-bold">solana tools</div>
        <WalletMultiButton />
      </header>

      <main className="flex-grow">
      {/* <main className="flex-grow p-4"> */}
        <Outlet />
      </main>

      {/* <footer className="p-4 text-center text-sm">
        © 2025 Solana Tools
      </footer> */}
    </div>
  );
}
