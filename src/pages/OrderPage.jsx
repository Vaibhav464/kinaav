// import React, { useState, useEffect } from 'react';
// import '../styles/navbar.css';

// const OrderPage = () => {
//   const [orders, setOrders] = useState([]);

//   // Function to simulate fetching orders
//   const fetchOrders = () => {
//     // In a real app, replace this with an API call
//     const mockOrders = [
//       { id: 1, date: '2025-01-01', total: 1000, status: 'Delivered', image: '/img/order1.jpg' },
//       { id: 2, date: '2025-01-05', total: 1500, status: 'Processing', image: '/img/order1.jpg' },
//       { id: 3, date: '2025-02-10', total: 2000, status: 'Shipped', image: '/img/order1.jpg' },
//     ];
//     setOrders(mockOrders);
//   };

//   // Fetch orders when the component mounts
//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   return (
//     <div className="order-page">
//       <h1>Your Orders</h1>
//       <div className="order-list">
//         {orders.length === 0 ? (
//           <p>No orders found.</p>
//         ) : (
//           orders.map((order) => (
//             <div key={order.id} className="order-item">
//               <img src={order.image} alt={`Order ${order.id}`} className="order-image" />
//               <div className="order-details">
//               <div className="order-detail">
//                 <span>Order ID:</span> {order.id}
//               </div>
//               <div className="order-detail">
//                 <span>Date:</span> {order.date}
//               </div>
//               <div className="order-detail">
//                 <span>Total:</span> ₹{order.total}
//               </div>
//               <div className="order-detail">
//                 <span>Status:</span> {order.status}
//               </div>
//             </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderPage;

import React, { useState, useEffect } from 'react';
import '../styles/navbar.css';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    const mockOrders = [
      { id: 1, date: '2025-01-01', total: 1000, status: 'Delivered', image: '/img/order1.jpg' },
      { id: 2, date: '2025-01-05', total: 1500, status: 'Processing', image: '/img/order1.jpg' },
      { id: 3, date: '2025-02-10', total: 2000, status: 'Shipped', image: '/img/order1.jpg' },
    ];
    setOrders(mockOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="my-account-container">
      <div className="my-account-wrapper">
        <main className="my-account-main">
          <h1 className="my-account-title">Your Orders</h1>
          <section className="my-account-section">
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
                      <img src={order.image} alt={`Order ${order.id}`} className="my-account-order-image" />
                      <div>
                        <p><strong>Total:</strong> ₹{order.total.toFixed(2)}</p>
                        <p><strong>Status:</strong> <span className={`my-account-order-status ${order.status.toLowerCase()}`}>{order.status}</span></p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default OrderPage;