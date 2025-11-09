import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { SignupPage } from './pages/SignupPage';
import { LoginPage } from './pages/LoginPage';

export function App() {
  return (
    <BrowserRouter>
      <Layout direction="column" className="min-h-screen bg-[var(--color-surface)]">
        {/* Parent container with consistent max-width and horizontal margins */}
        <Layout direction="column" className="w-full max-w-screen-xl mx-auto px-4 md:px-8">
          {/* Header - full width within parent container */}
          <Header />

          {/* Main content - full width within parent container */}
          <main className="w-full">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </main>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}
