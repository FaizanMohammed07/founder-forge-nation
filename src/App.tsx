import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index.tsx";
import SurveyPage from "./pages/SurveyPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import StoriesPage from "./pages/StoriesPage.tsx";
import StoryDetailPage from "./pages/StoryDetailPage.tsx";
import FoundersMeetRegisterPage from "./pages/FoundersMeetRegisterPage.tsx";
import FoundersMeetLandingPage from "./pages/FoundersMeetLandingPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/stories/:slug" element={<StoryDetailPage />} />
          <Route path="/survey" element={<SurveyPage />} />
          <Route path="/apply" element={<SurveyPage />} />
          <Route path="/events" element={<FoundersMeetLandingPage />} />
          <Route
            path="/events/founders-meet-2026"
            element={<FoundersMeetLandingPage />}
          />
          <Route
            path="/events/founders-meet-2026/register"
            element={<FoundersMeetRegisterPage />}
          />
          <Route path="/admin" element={<AdminPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
