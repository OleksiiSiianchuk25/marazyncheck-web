// src/components/Admin/ProductAdminPage.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import SideBar from '../User/SideBar';
import './ProductAdminPage.css';
import { Product } from '../../interfaces/Product';
import AuthService from '../../services/AuthService';
import ProductEditModal from '../modal/ProductEditModal';

const ProductAdminPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sort, setSort] = useState<{ field: keyof Product, dir: string }>({ field: 'name', dir: 'asc' });

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, sort]);

  const fetchProducts = async (page: number, pageSize = 5) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/products/table/all?page=${page}&size=${pageSize}&sort=${sort.field},${sort.dir}`, {
        headers: {
          Authorization: `Bearer ${AuthService.getCurrentUser()?.jwtToken}`
        }
      });
      if (response.data && response.data.content) {
        setProducts(response.data.content);
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = () => {
    setSelectedProduct(null); 
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product); 
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${AuthService.getCurrentUser()?.jwtToken}`
        }
      });
      fetchProducts(currentPage);
    } catch (error) {
      console.error('Не вдалося видалити товар:', error);
    }
  };

  const handleSort = (field: keyof Product) => {
    const dir = sort.field === field && sort.dir === 'asc' ? 'desc' : 'asc';
    setSort({ field, dir });
  };

  const handleSave = async (product: Product) => {
    try {
      const url = product.id ? `http://localhost:8080/api/products/${product.id}` : `http://localhost:8080/api/products`;
      const method = product.id ? 'put' : 'post';
      const response = await axios({
        method,
        url,
        data: product,
        headers: {
          Authorization: `Bearer ${AuthService.getCurrentUser()?.jwtToken}`
        }
      });
      if (response.status === 200 || response.status === 201) {
        fetchProducts(currentPage);
        setIsModalOpen(false);
      } else {
        console.error('Не вдалося зберегти товар:', response);
      }
    } catch (error) {
      console.error('Не вдалося зберегти товар:', error);
    }
  };

  return (
    <div className="product-admin-page">
      <SideBar />
      <div className='table-content'>
        <button onClick={handleAddProduct}>Add New Product</button>
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>Image</th>
              <th onClick={() => handleSort('name')}>Name</th>
              <th onClick={() => handleSort('price')}>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td><img src={product.imageUrl} alt={product.name} style={{ width: '50px', height: '50px' }} /></td>
                <td>{product.name}</td>
                <td>₴{product.price.toFixed(2)}</td>
                <td>
                  <button onClick={() => handleEditProduct(product)}>Edit</button>
                  <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setCurrentPage(i)}>{i + 1}</button>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <ProductEditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={selectedProduct}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ProductAdminPage;
