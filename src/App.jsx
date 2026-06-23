import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Donors from "./pages/Donors";
import Donations from "./pages/Donations";
import Reports from "./pages/Reports";
import Receipts from "./pages/Receipts";
import DonorHistory from "./pages/DonorHistory";
import DonationSearch from "./pages/DonationSearch";

import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/donors" element={<Donors />} />
          <Route path="/donors/:id/history" element={<DonorHistory />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/receipts" element={<Receipts />} />
          <Route path="/donation-search" element={<DonationSearch />}/>
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;