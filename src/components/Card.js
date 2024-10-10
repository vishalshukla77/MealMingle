// Card.js
import React, { useRef, useState, useEffect } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

const Card = (props) => {
  const dispatch = useDispatchCart();
  const cartItems = useCart(); // Fetch cart items from context
  const priceRef = useRef();

  const { foodItem, options } = props;
  const imageUrl = foodItem.img;
  const priceOptions = Object.keys(options || {});

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions[0] || '');
  const [finalPrice, setFinalPrice] = useState(qty * parseInt(options[size] || 0));

  useEffect(() => {
    setFinalPrice(qty * parseInt(options[size] || 0));
  }, [qty, size, options]);

  const handleAddToCart = async () => {
    if (!cartItems) {
      return; // Handle error or log message appropriately
    }

    const existingItem = cartItems.find(item => item.id === foodItem._id && item.size === size);

    if (existingItem) {
      await dispatch({
        type: "UPDATE",
        id: foodItem._id,
        qty: qty + existingItem.qty,
        price: finalPrice + existingItem.price
      });
    } else {
      await dispatch({
        type: "ADD",
        id: foodItem._id,
        name: foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size
      });
    }
  };

  return (
    <div>
      <div className="card mt-3" style={{ width: '18rem', maxHeight: '360px' }}>
      <img src={imageUrl} className="card-img-top" alt={foodItem.name} style={{ maxHeight: '120px', objectFit: "fill" }} />

        <div className="card-body">
          <h5 className="card-title">{foodItem.name}</h5>
          <div className='container w-100'>
            <select className='m-2 h-100 bg-success text-white' onChange={(e) => setQty(parseInt(e.target.value))}>
              {
                Array.from({ length: 6 }, (e, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))
              }
            </select>
            <select className='m-2 h-100 bg-success text-white rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {
                priceOptions.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))
              }
            </select>
            <div className='d-inline h-100 fs-5'>
              ₹{finalPrice}/-
            </div>
          </div>
          <hr />
          <button className='btn btn-success justify-content-center ms-2' onClick={handleAddToCart}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
