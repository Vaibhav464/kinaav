import React, { useState, useEffect } from 'react';
import '../styles/navbar.css'; // Import the CSS file for styling

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  // Function to simulate fetching orders
  const fetchOrders = () => {
    // In a real app, replace this with an API call
    const mockOrders = [
      { id: 1, date: '2025-01-01', total: 1000, status: 'Delivered', image: '/img/order1.jpg' },
      { id: 2, date: '2025-01-05', total: 1500, status: 'Processing', image: '/img/order1.jpg' },
      { id: 3, date: '2025-02-10', total: 2000, status: 'Shipped', image: '/img/order1.jpg' },
    ];
    setOrders(mockOrders);
  };

  // Fetch orders when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="order-page">
      <h1>Your Orders</h1>
      <div className="order-list">
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="order-item">
              <img src={order.image} alt={`Order ${order.id}`} className="order-image" />
              <div className="order-details">
              <div className="order-detail">
                <span>Order ID:</span> {order.id}
              </div>
              <div className="order-detail">
                <span>Date:</span> {order.date}
              </div>
              <div className="order-detail">
                <span>Total:</span> ₹{order.total}
              </div>
              <div className="order-detail">
                <span>Status:</span> {order.status}
              </div>
            </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderPage;