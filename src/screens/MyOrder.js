import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    const userEmail = localStorage.getItem('userEmail');
    try {
      const response = await fetch("https://food-delivery-web-pvcg.onrender.com/api/myorderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: userEmail })
      });

      if (response.ok) {
        const data = await response.json();
        setOrderData(data.orderData.order_data || []);
      } else {
        console.error('Failed to fetch order data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching order data:', error.message);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='row'>
          {orderData.length ? orderData.slice(0).reverse().map((order, orderIndex) => (
            <div key={orderIndex} className='w-100'>
              <div className='m-auto mt-5'>
                <h3>Order Date: {order[0].Order_date}</h3>
                <hr />
              </div>
              {order.slice(1).map((item, itemIndex) => (
                <div key={itemIndex} className='col-12 col-md-6 col-lg-3'>
                  <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <div className='container w-100 p-0'>
                        <span className='m-1'>Quantity: {item.qty}</span>
                        <br />
                        <span className='m-1'>Size: {item.size}</span>
                        <br />
                        <span className='m-1'>Price: ₹{item.price}/-</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )) : <p>No orders found</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
}
