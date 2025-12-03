import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Layout from './components/Layout';
import Home from './pages/Home';
import Post from './pages/Post'; // We are about to build this
import Admin from './pages/Admin';
import RequireAuth from './components/RequireAuth';
import Editor from './pages/Editor';
import Weblogs from './pages/Weblogs';
import Entropy from './pages/Entropy';
import NotFound from './pages/NotFound';
import { ToastProvider } from './components/Toast';
import Project from './pages/Projects';

const queryClient = new QueryClient();

// Helper to reset scroll on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
      <ScrollToTop /> {/* <--- Added this to ensure top-of-page on nav */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout />}>
            {/* Public Routes */}
            <Route index element={<Home />} />
            {/* NEW: The Archive Page */}
            <Route path="weblogs" element={<Weblogs />} />
            <Route path="weblogs/:slug" element={<Post />} />
            <Route path="randoms" element={<Entropy />} />
            <Route path="projects" element={<Project />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/admin" element={
            <RequireAuth>
              <Admin />
            </RequireAuth>
          } />
          <Route path="/admin/new" element={
            <RequireAuth>
              <Editor />
            </RequireAuth>
          } />
          <Route path="/admin/edit/:id" element={
            <RequireAuth>
              <Editor />
            </RequireAuth>
          } />
        </Routes>
      </AnimatePresence>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;