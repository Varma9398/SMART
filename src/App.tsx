import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import Index from "./pages/Index";
import OnboardingModal from './components/OnboardingModal';
import React from 'react';

const queryClient = new QueryClient();

const App = () => {
  const [onboardingOpen, setOnboardingOpen] = React.useState(() => {
    return localStorage.getItem('ai_colour_engine_onboarding_complete') !== 'true';
  });

  // Determine which router to use based on deployment environment
  const isVercel = import.meta.env.VITE_VERCEL === 'true';
  const Router = isVercel ? BrowserRouter : HashRouter;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <OnboardingModal open={onboardingOpen} onComplete={() => setOnboardingOpen(false)} />
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          </Routes>
        </Router>
        <Analytics />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
