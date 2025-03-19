import EditorPanel from "./_components/EditorPanel";
import Header from "./_components/Header";
import OutputPanel from "./_components/OutputPanel";
import { ProductShowcase } from "./_components/product-showcase";
import {ProductShowcase1} from "./_components/product-showcase1";
import { Faqs } from "./_components/faqs";
import Footer from "@/components/Footer";

import MobilePopup from "./_components/MobilePopup";

export default function Home() {
  return (
    <div className="min-h-screen">
      <MobilePopup /> {/* Client-side popup for mobile devices */}
      <div className="max-w-[1800px] mx-auto p-4">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <EditorPanel />
          <OutputPanel />
        </div>
         
      </div>
      
            {/* <Features /> */}
            <ProductShowcase />
            <ProductShowcase1/>
            <Faqs />
            <Footer/>
            
    </div>
    
    
  );
}
