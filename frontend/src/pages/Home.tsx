
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CTASection } from '@/components/home/CTASection';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import { Loading } from '@/components/ui/loading';

export default function Home() {
  const { isLoading } = useAuthRedirect();

  // Se está carregando, mostrar loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" text="Carregando..." />
      </div>
    );
  }

  return (
    <MainLayout>
      <HeroSection />
      <section id="features" className="scroll-mt-16">
        <FeaturesSection />
      </section>
      <section id="about" className="scroll-mt-16">
        <TestimonialsSection />
      </section>
      <section id="contact" className="scroll-mt-16">
        <CTASection />
      </section>
    </MainLayout>
  );
}
