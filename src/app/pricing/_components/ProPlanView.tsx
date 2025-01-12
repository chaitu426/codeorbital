import NavigationHeader from "@/components/NavigationHeader";
import { ArrowRight, Command, Star } from "lucide-react";
import Link from "next/link";

function ProPlanView() {
  return (
    <div className="bg-gradient-to-b from-[#0a0a0f] to-[#121212] min-h-screen">
      <NavigationHeader />
      <div className="relative px-6 flex items-center justify-center h-[80vh]">
        <div className="relative max-w-2xl mx-auto text-center">
          {/* Top and Bottom Gradient Lines */}
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

          {/* Outer Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-3xl opacity-20" />

          {/* Card */}
          <div className="relative bg-[#12121a]/80 border border-gray-700/50 backdrop-blur-xl rounded-3xl p-10 shadow-lg">
            {/* Subtle Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] to-purple-500/[0.05] rounded-3xl pointer-events-none" />

            <div className="relative">
              {/* Icon Section */}
              <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 mb-6 ring-1 ring-gray-700/50">
                <Star className="w-8 h-8 text-purple-400" />
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold text-white mb-4">Pro Plan Active</h1>

              {/* Description */}
              <p className="text-lg text-gray-400 mb-8">
                Unlock the full potential of professional development with our premium features.
              </p>

              {/* Call to Action Button */}
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-3 w-full px-8 py-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 text-white rounded-xl transition-all duration-300 border border-gray-700 hover:border-blue-500/50 group"
              >
                <Command className="w-5 h-5 text-blue-400" />
                <span>Open Editor</span>
                <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProPlanView;
