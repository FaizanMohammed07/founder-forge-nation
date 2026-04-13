import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import SurveyPage from "./pages/SurveyPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import FoundersMeetRegisterPage from "./pages/FoundersMeetRegisterPage.tsx";
import FoundersMeetLandingPage from "./pages/FoundersMeetLandingPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/survey" element={<SurveyPage />} />
          <Route path="/apply" element={<SurveyPage />} />
          <Route
            path="/events/founders-meet-2026"
            element={<FoundersMeetLandingPage />}
          />
          <Route
            path="/events/founders-meet-2026/register"
            element={<FoundersMeetRegisterPage />}
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
