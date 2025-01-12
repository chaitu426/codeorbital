import { Zap } from "lucide-react"; 
import Link from "next/link";

export default function UpgradeButton() {
  const CHECKOUT_URL =
    "https://saas-project.lemonsqueezy.com/buy/f5d74901-f9a9-43f7-b07e-68486d1c2f48";

  return (
    <Link
      href={CHECKOUT_URL}
      target="_blank" // Opens the link in a new tab
      className="inline-flex items-center justify-center gap-3 px-8 py-4 text-white 
        bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg 
        hover:from-purple-600 hover:to-pink-600 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
    >
      <Zap className="w-5 h-5 text-yellow-400" />
      <span className="font-semibold">Upgrade to Pro</span>
    </Link>
  );
}
