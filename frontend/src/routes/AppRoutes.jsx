import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "../components/Layout/Header";
import Footer from "../components/Common/Footer";
import ProtectedRoute from "../components/Auth/ProtectedRoute";

// Lazily loaded pages (code splitting)
const Home = lazy(() => import("../pages/Home"));
const Services = lazy(() => import("../pages/Services"));
const Portfolio = lazy(() => import("../pages/Portfolio"));
const PortfolioDetail = lazy(() => import("../pages/PortfolioDetail"));
const About = lazy(() => import("../pages/About"));
const Blog = lazy(() => import("../pages/Blog"));
const BlogDetail = lazy(() => import("../pages/BlogDetail"));
const Contact = lazy(() => import("../pages/Contact"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const NotFound = lazy(() => import("../pages/NotFound"));

/**
 * AppRoutes.jsx
 *  - Defines all top-level routes, wrapping protected ones with ProtectedRoute.
 *  - Always shows Header and Footer.
 */
export default function AppRoutes() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
