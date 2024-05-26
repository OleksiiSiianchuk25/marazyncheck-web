import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import SideBar from '../User/SideBar';
import './OrdersAdminPage.css';
import AuthService from '../../services/AuthService';

// Define the types for order and order details
interface Order {
  orderId: number;
  telegram: string;
  dateOfOrder: Date;
  totalPrice: number;
}

interface OrderDetails {
  date: string;
  orderItems: Array<{ name: string, quantity: number, price: number }>;
  totalPrice: number;
  customer: string;
}

const OrdersAdminPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<OrderDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  Modal.setAppElement('#root');

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const fetchOrders = (page: number, pageSize = 5) => {
    axios.get(`http://localhost:8080/api/orders/table?page=${page}&size=${pageSize}`, {
      headers: {
        Authorization: `Bearer ${AuthService.getCurrentUser()?.jwtToken}`
      }
    })
    .then(response => {
      if (response.data && response.data.content) {
        setOrders(response.data.content);
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
      }
    })
    .catch(error => console.error('Error fetching orders:', error));
  };

  const fetchOrderDetails = (orderId: number) => {
    axios.get(`http://localhost:8080/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${AuthService.getCurrentUser()?.jwtToken}`
      }
    })
    .then(response => {
      if (response.data) {
        setCurrentOrder({
          date: new Date(response.data.dateOfOrder).toLocaleDateString("en-US"),
          orderItems: response.data.items.map((item: any) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
          })),
          totalPrice: response.data.totalPrice,
          customer: `${response.data.customerTelegram} (${response.data.customerName})`
        });
        setIsModalOpen(true);
      }
    })
    .catch(error => {
      console.error('Error fetching order details:', error);
      setCurrentOrder(null); 
    });
  };

  return (
    <div className="order-table-content">
      <SideBar />
      <div className='table-content'>
        <table className='order-table'>
          <thead>
            <tr>
              <th>Telegram</th>
              <th>Дата замовлення</th>
              <th>Загальна сума</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.orderId}>
                <td>{order.telegram}</td>
                <td>{new Date(order.dateOfOrder).toLocaleDateString()}</td>
                <td>₴{order.totalPrice.toFixed(2)}</td>
                <td>
                  <button className='order-table-content-button' onClick={() => fetchOrderDetails(order.orderId)}>Детальніше</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Order Details"
          className="Modal"
          overlayClassName="Overlay"
        >
          <h2>Опис замовлення</h2>
          {currentOrder ? (
            <div>
              <p>Покупець: {currentOrder.customer}</p>
              <p>Дата замовлення: {currentOrder.date}</p>
              <p>Товари:</p>
              <ul>
                {currentOrder.orderItems.map((item, index) => (
                  <li key={index}>{item.name}, {item.quantity}, ₴{item.price.toFixed(2)}</li>
                ))}
              </ul>
              <p>Загальна сума: ₴{currentOrder.totalPrice.toFixed(2)}</p>
              <button className='modal-close-button' onClick={() => setIsModalOpen(false)}>Закрити</button>
            </div>
          ) : <p>Loading...</p>}
        </Modal>
        <div className='pagination'>
          {Array.from({ length: totalPages }, (_, i) => (
            <button className="pagination-button" key={i} onClick={() => setCurrentPage(i)}>{i + 1}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersAdminPage;
