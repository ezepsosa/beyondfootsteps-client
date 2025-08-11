import { MainLayout } from "@/components/layout";
import { ScrollToTop } from "@/hooks/useScrollUp";
import AboutUs from "@/pages/aboutus";
import { AsylumDecisions } from "@/pages/asylumDecisions";
import { AsylumRequests } from "@/pages/asylumRequests";
import { Dashboard } from "@/pages/dashboard";
import { Home } from "@/pages/home";
import { NotFound } from "@/pages/notFound";
import { ResettlementSummary } from "@/pages/resettlements";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop/>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/requests" element={<AsylumRequests />} />
            <Route path="/decisions" element={<AsylumDecisions />} />
            <Route path="/resettlements" element={<ResettlementSummary />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  );
};
