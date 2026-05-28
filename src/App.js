import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ScrollToTop from './components/ScrollToTop';
import Support from './pages/Support';
import GuideLayout from './pages/guide/GuideLayout';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import DPA from './pages/DPA';
import SubProcessors from './pages/SubProcessors';
import SecurityPolicy from './pages/SecurityPolicy';
import SLA from './pages/SLA';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/support" element={<Support />} />
        <Route path="/support/guide" element={<GuideLayout />} />
        <Route path="/support/guide/:slug" element={<GuideLayout />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/dpa" element={<DPA />} />
        <Route path="/sub-processors" element={<SubProcessors />} />
        <Route path="/security-policy" element={<SecurityPolicy />} />
        <Route path="/sla" element={<SLA />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
