import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync user data with backend
  const syncUserWithBackend = async (supabaseUser) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/sync-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          supabaseId: supabaseUser.id,
          email: supabaseUser.email,
          name: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name,
          profilePicture: supabaseUser.user_metadata?.avatar_url
        }),
      });

      const data = await response.json();
      if (data.success) {
        setUserData(data.user);
        return data.user;
      }
    } catch (error) {
      console.error('Error syncing user with backend:', error);
    }
    return null;
  };

  // Get user data from backend
  const fetchUserData = async (supabaseId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${supabaseId}`);
      const data = await response.json();
      if (data.success) {
        setUserData(data.user);
        return data.user;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    return null;
  };

  // Update user profile
  const updateUserProfile = async (updates) => {
    if (!user) return null;
    
    try {
      const response = await fetch(`http://localhost:5000/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();
      if (data.success) {
        setUserData(data.user);
        return data.user;
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
    return null;
  };

  // Get user orders
  const fetchUserOrders = async () => {
    if (!user) return [];
    
    try {
      const response = await fetch(`http://localhost:5000/api/users/${user.id}/orders`);
      const data = await response.json();
      if (data.success) {
        return data.orders;
      }
    } catch (error) {
      console.error('Error fetching user orders:', error);
    }
    return [];
  };

  useEffect(() => {
    // Get current user on mount
    const getCurrentUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          await syncUserWithBackend(session.user);
        }
      } catch (error) {
        console.error('Error getting current user:', error);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        await syncUserWithBackend(session.user);
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    userData,
    loading,
    syncUserWithBackend,
    fetchUserData,
    updateUserProfile,
    fetchUserOrders
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext; 