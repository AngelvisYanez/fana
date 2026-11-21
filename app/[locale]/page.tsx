'use client';

import { useParams } from 'next/navigation';
import HeroSection from '@/components/HeroSection';
import ServicesShowcase from '@/components/ServicesShowcase';
import AboutShowcase from '@/components/AboutShowcase';
import VideoExpand from '@/components/home/VideoExpand';
import OurServicesSection from '@/components/OurServicesSection';
import StatsBand from '@/components/home/StatsBand';
import WhyChooseBento from '@/components/home/WhyChooseBento';
import TestimonialsFeature from '@/components/home/TestimonialsFeature';
import CtaBanner from '@/components/home/CtaBanner';
import ContactSplit from '@/components/home/ContactSplit';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

export default function Home() {
  const params = useParams();
  const locale = params.locale as string || 'es';

  return (
    <PageTransition>
      <div className="min-h-screen">
        <HeroSection />
        <ServicesShowcase />
        <AboutShowcase />
        <VideoExpand />
        <OurServicesSection />
        
        <StatsBand />
        <WhyChooseBento />
        <TestimonialsFeature />
        <CtaBanner locale={locale} />
        <ContactSplit locale={locale} />

      <Footer />
      </div>
    </PageTransition>
  );
}
