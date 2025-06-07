import { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "./components/Common/LoadingSpinner";
import ScrollToTop from "./components/Common/ScrollToTop";
import AppRoutes from "./routes/AppRoutes";
import { useError } from "./contexts/ErrorContext";

export default function App() {
  const { error } = useError();

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>UltraProfile+ | Next-Gen Portfolio</title>
        <meta
          name="description"
          content="UltraProfile+—AI-powered, real-time, and hyper-scalable portfolio platform."
        />
      </Helmet>

      {error && (
        <div className="fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-md shadow-lg z-50">
          {error}
        </div>
      )}

      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner />}>
        <AppRoutes />
      </Suspense>
    </>
  );
}
