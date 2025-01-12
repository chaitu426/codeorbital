import { Check } from "lucide-react";

const FeatureItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-4 group">
    {/* Icon Wrapper */}
    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
      <Check className="w-4 h-4 text-white" />
    </div>
    {/* Text Content */}
    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
      {children}
    </span>
  </div>
);

export default FeatureItem;
