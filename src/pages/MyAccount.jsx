import React, { useState, useEffect } from 'react';
import '../styles/navbar.css';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userData, fetchUserOrders, updateUserProfile } = useUser();

  // Fetch user orders when orders tab is active
  useEffect(() => {
    if (activeTab === 'orders' && userData) {
      const loadOrders = async () => {
        const userOrders = await fetchUserOrders();
        setOrders(userOrders);
      };
      loadOrders();
    }
  }, [activeTab, userData, fetchUserOrders]);

  // Set loading to false when userData is available
  useEffect(() => {
    if (userData) {
      setLoading(false);
    }
  }, [userData]);

  // Show loading state
  if (loading) {
    return (
      <div className="my-account-container">
        <div className="my-account-wrapper">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Show login prompt if no user data
  if (!userData) {
    return (
      <div className="my-account-container">
        <div className="my-account-wrapper">
          <p>Please log in to view your account.</p>
          <button onClick={() => navigate('/login')}>Go to Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-account-container">
      <div className="my-account-wrapper">
        <aside className="my-account-sidebar">
          <div className="my-account-user-info">
            <img
              src={userData.profilePicture || 'https://via.placeholder.com/120'}
              alt="User Profile"
              className="my-account-user-image"
            />
            <h2 className="my-account-user-name">{userData.name || 'User'}</h2>
          </div>
          <nav className="my-account-nav">
            <button
              onClick={() => setActiveTab('profile')}
              className={`my-account-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`my-account-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`my-account-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            >
              Account Settings
            </button>
          </nav>
        </aside>

        <main className="my-account-main">
          <h1 className="my-account-title">My Account</h1>

          {activeTab === 'profile' && (
            <section className="my-account-section">
              <h2 className="my-account-section-title">Profile Details</h2>
              <div className="my-account-profile-details">
                <p><strong>Name:</strong> {userData.name || 'Not set'}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Phone:</strong> {userData.phone || 'Not set'}</p>
                {userData.addresses && userData.addresses.length > 0 && (
                  <div>
                    <p><strong>Addresses:</strong></p>
                    {userData.addresses.map((address, index) => (
                      <div key={index} style={{ marginLeft: '20px', marginTop: '10px' }}>
                        <p>{address.name}</p>
                        <p>{address.street}</p>
                        <p>{address.city}, {address.state} {address.zip}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button
                className="my-account-logout-button"
                onClick={async () => {
                  await supabase.auth.signOut();
                  navigate('/');
                }}
              >
                Logout
              </button>
            </section>
          )}

          {activeTab === 'orders' && (
            <section className="my-account-section">
              <h2 className="my-account-section-title">Order History</h2>
              {orders.length === 0 ? (
                <p className="my-account-no-orders">You have no orders yet.</p>
              ) : (
                <div className="my-account-orders">
                  {orders.map((order) => (
                    <div key={order.orderId} className="my-account-order-card">
                      <div className="my-account-order-header">
                        <span>Order #{order.orderId}</span>
                        <span className="my-account-order-date">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="my-account-order-details">
                        <p><strong>Total:</strong> ₹{order.totalAmount?.toFixed(2) || '0.00'}</p>
                        <p><strong>Items:</strong> {order.items?.length || 0}</p>
                        <p><strong>Status:</strong> <span className={`my-account-order-status ${order.status?.toLowerCase()}`}>{order.status}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {activeTab === 'settings' && (
            <section className="my-account-section">
              <h2 className="my-account-section-title">Account Settings</h2>
              <div className="my-account-settings">
                <div className="my-account-settings-form">
                  <label htmlFor="name">Update Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    className="my-account-settings-input"
                    defaultValue={userData.name || ''}
                  />
                  <button 
                    className="my-account-settings-button"
                    onClick={async () => {
                      const name = document.getElementById('name').value;
                      if (name.trim()) {
                        await updateUserProfile({ name: name.trim() });
                      }
                    }}
                  >
                    Update Name
                  </button>
                </div>
                <div className="my-account-settings-form">
                  <label htmlFor="phone">Update Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Enter your phone number"
                    className="my-account-settings-input"
                    defaultValue={userData.phone || ''}
                  />
                  <button 
                    className="my-account-settings-button"
                    onClick={async () => {
                      const phone = document.getElementById('phone').value;
                      if (phone.trim()) {
                        await updateUserProfile({ phone: phone.trim() });
                      }
                    }}
                  >
                    Update Phone
                  </button>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default MyAccount;