
import { CallToAction } from '../(root)/_components/call-to-action';
import { Faqs } from '../(root)/_components/faqs';
import { Features } from '../(root)/_components/features';


import { LogoTicker } from '../(root)/_components/logo-ticker';
import { Navbar } from './_components/navbar';
import { ProductShowcase } from "../(root)/_components/product-showcase";

export function landingPage() {
  return (
    <div className="min-h-screen antialiased">
      
      <Navbar />
      
      <LogoTicker />
      <Features />
      <ProductShowcase />
      <Faqs />
      <CallToAction />
     
    </div>
  )
}

export default landingPage;