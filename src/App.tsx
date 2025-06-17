import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import OnboardingModal from './components/OnboardingModal';
import React from 'react';

const queryClient = new QueryClient();

const App = () => {
  const [onboardingOpen, setOnboardingOpen] = React.useState(() => {
    return localStorage.getItem('ai_palettegenius_onboarding_complete') !== 'true';
  });

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
        <OnboardingModal open={onboardingOpen} onComplete={() => setOnboardingOpen(false)} />
        <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        </Routes>
        </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
};

export default App;
