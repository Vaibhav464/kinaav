import React, { useState } from 'react';
import '../styles/navbar.css';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Commerce Street, E-Commerce City, EC 12345',
    profilePicture: 'https://via.placeholder.com/120', // Placeholder image
  };

  // Mock order data
  const orders = [
    { id: 'ORD-001', date: '2025-06-20', total: 560, status: 'Delivered', items: 2 },
    { id: 'ORD-002', date: '2025-06-25', total: 149, status: 'Processing', items: 1 },
    { id: 'ORD-003', date: '2025-07-01', total: 299, status: 'Shipped', items: 3 },
  ];

  return (
    <div className="my-account-container">
      <div className="my-account-wrapper">
        <aside className="my-account-sidebar">
          <div className="my-account-user-info">
            <img
              src={user.profilePicture}
              alt="User Profile"
              className="my-account-user-image"
            />
            <h2 className="my-account-user-name">{user.name}</h2>
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
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Address:</strong> {user.address}</p>
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
                    <div key={order.id} className="my-account-order-card">
                      <div className="my-account-order-header">
                        <span>Order #{order.id}</span>
                        <span className="my-account-order-date">{order.date}</span>
                      </div>
                      <div className="my-account-order-details">
                        <p><strong>Total:</strong> ₹{order.total.toFixed(2)}</p>
                        <p><strong>Items:</strong> {order.items}</p>
                        <p><strong>Status:</strong> <span className={`my-account-order-status ${order.status.toLowerCase()}`}>{order.status}</span></p>
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
                  <label htmlFor="email">Change Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter new email"
                    className="my-account-settings-input"
                  />
                  <button className="my-account-settings-button">Update Email</button>
                </div>
                <div className="my-account-settings-form">
                  <label htmlFor="password">Change Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter new password"
                    className="my-account-settings-input"
                  />
                  <button className="my-account-settings-button">Update Password</button>
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