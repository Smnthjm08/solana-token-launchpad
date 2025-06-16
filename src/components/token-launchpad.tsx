import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createInitializeMint2Instruction,
  getMinimumBalanceForRentExemptMint,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";

export default function TokenLaunchpad() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [image, setImage] = useState("");
  const [initialSupply, setInitialSupply] = useState("");
  const { connection } = useConnection();
  const wallet = useWallet();

  if (!wallet.connected || wallet.publicKey === null) {
    alert("Please connect your wallet first.");
    return null;
  }

  async function createToken() {
    const mintKeypair = Keypair.generate();
    const lamports = await getMinimumBalanceForRentExemptMint(connection);

    if(!wallet.publicKey) return null;

    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: mintKeypair.publicKey,
        space: MINT_SIZE,
        lamports,
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeMint2Instruction(
        mintKeypair.publicKey,
        9,
        wallet.publicKey,
        wallet.publicKey,
        TOKEN_PROGRAM_ID
      )
    );

    transaction.feePayer = wallet.publicKey;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;
    transaction.partialSign(mintKeypair);

    await wallet.sendTransaction(transaction, connection);
    console.log(`Token mint created at ${mintKeypair.publicKey.toBase58()}`);
  }

  return (
    <main className="flex flex-col items-center gap-4 justify-center h-screen">
      <h1 className="text-4xl font-bold">Token Launchpad</h1>
      <Input
        type="text"
        id="name"
        placeholder="Name"
        className="w-80 h-10"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="text"
        id="symbol"
        placeholder="Symbol"
        className="w-80 h-10"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <Input
        type="text"
        id="image"
        placeholder="Image Url"
        className="w-80 h-10"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Input
        type="text"
        id="initialSupply"
        placeholder="Initial Supply"
        className="w-80 h-10"
        value={initialSupply}
        onChange={(e) => setInitialSupply(e.target.value)}
      />
      <Button onClick={createToken}>Create Token</Button>
    </main>
  );
}
