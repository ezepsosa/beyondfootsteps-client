import { MainLayout } from "@/components/layout";
import { AsylumDecisions } from "@/pages/asylumDecisions";
import { AsylumRequests } from "@/pages/asylumRequests";
import { Dashboard } from "@/pages/dashboard";
import { NotFound } from "@/pages/notFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/requests" element={<AsylumRequests />} />
          <Route path="/decisions" element={<AsylumDecisions />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
