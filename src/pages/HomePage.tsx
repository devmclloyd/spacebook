
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function getProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) throw new Error("No user");
        
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        
        setProfile(data);
      } catch (error) {
        console.error('Error getting profile:', error);
      } finally {
        setLoading(false);
      }
    }
    
    getProfile();
  }, []);

  async function handleSignOut() {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Spacebook</h1>
              <div className="ml-10 flex space-x-4">
                <a href="/" className="px-3 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">Home</a>
                <a href="/products" className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">Products</a>
              </div>
            </div>
            <div className="flex items-center">
              <button 
                onClick={handleSignOut}
                className="px-4 py-2 text-sm text-red-600 bg-white border border-red-600 rounded-md hover:bg-red-50"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-4 bg-white">
            <h2 className="text-2xl font-bold mb-4">Welcome to Spacebook!</h2>
            
            {profile ? (
              <div className="space-y-4">
                <p><strong>Name:</strong> {profile.first_name} {profile.last_name}</p>
                {profile.business_name && <p><strong>Business:</strong> {profile.business_name}</p>}
                {profile.phone_number && <p><strong>Phone:</strong> {profile.phone_number}</p>}
                {profile.address && <p><strong>Address:</strong> {profile.address}</p>}
                <p><strong>Role:</strong> {profile.role}</p>
                <p><strong>Customer Status:</strong> {profile.is_customer ? 'Customer' : 'Not a Customer'}</p>
              </div>
            ) : (
              <p>No profile data found. Please update your profile.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
