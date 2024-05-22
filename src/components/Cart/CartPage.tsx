import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart, updateQuantity } from '../../store/cart/cartSlice';
import { RootState } from '../../store/store';
import './CartPage.css';
import recycle_bin from "../../Images/Cart/recycle-bin.png";
import AuthService from '../../services/AuthService';

const CartPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const totalPrice = cartItems.reduce((total, item) => total + (item.quantity * item.product.price), 0);

  const handleQuantityChange = (productId: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ productId, quantity }));
    } else {
      dispatch(removeFromCart(productId));
    }
  };

  const handleChange = (productId: number, value: string) => {
    const quantity = parseInt(value, 10);
    handleQuantityChange(productId, quantity);
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    const currentUser = AuthService.getCurrentUser(); // Get the current user with the token
    if (!currentUser || !currentUser.jwtToken) {
      alert("You are not logged in!");
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.jwtToken}` // Use the JWT token for authorization
        },
        body: JSON.stringify({ items: cartItems.map(item => ({ productId: item.product.id, quantity: item.quantity, priceAtOrder: totalPrice })) })
      });
      if (response.ok) {
        dispatch(clearCart());
        alert("Order placed successfully!");
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };

  return (
    <div className="cart-page">
      <h2>Ваш кошик</h2>
      {cartItems.map((item, index) => (
        <div key={index} className="cart-item">
          <img src={item.product.imageUrl} alt={item.product.name} className="cart-item-image" />
          <div className="cart-item-details">
            <h3>{item.product.name}</h3>
            <div className='cart-quantity-price'>
              <div className="cart-item-quantity">
                <button onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}>-</button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleChange(item.product.id, e.target.value)}
                  className="quantity-input"
                  min="1"
                />
                <button onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}>+</button>
              </div>
              <div className='cart-item-price'>
                ₴{(item.quantity * item.product.price).toFixed(2)}
              </div>
            </div>
          </div>
          <div className="cart-item-remove">
            <button onClick={() => dispatch(removeFromCart(item.product.id))}>
              <img src={recycle_bin} alt="Recycle bin" className='recycle-bin' />
            </button>
          </div>
        </div>
      ))}
      <div className="cart-total">
        <h3>Усього: ₴{totalPrice.toFixed(2)}</h3>
        <button onClick={handlePlaceOrder}>Оформити замовлення</button>
      </div>
    </div>
  );
};

export default CartPage;
