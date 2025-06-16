import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export default function Home(){
    const navigator = useNavigate();
    return (
        <div className="flex items-center flex-col justify-center h-screen gap-4">
            <h1 className="text-4xl font-bold">Welcome to solana token launchpad</h1>
            <Button onClick={() => navigator("/token-launchpad")} className="hover:cursor-pointer">Token LaunchPad</Button>
        </div>
    )
}