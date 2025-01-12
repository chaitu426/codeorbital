import { useState, useEffect } from "react";

export default function MobilePopup() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isMobileDevice =
      /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(userAgent);
    setIsMobile(isMobileDevice);
  }, []);

  if (!isMobile) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow-md z-50">
      <p className="text-sm">For the best experience, please use a desktop.</p>
    </div>
  );
}
