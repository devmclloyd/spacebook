
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import { Session } from '@supabase/supabase-js';

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={session ? <HomePage /> : <Navigate to="/auth" />} />
        <Route path="/products" element={session ? <ProductsPage /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={!session ? <AuthPage /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
