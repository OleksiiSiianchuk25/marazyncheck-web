// src/components/modal/ProductEditModal.tsx

import React, { useState, FormEvent } from 'react';
import Modal from 'react-modal';
import { Product } from '../../interfaces/Product';
import './ProductEditModal.css';

interface ProductEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSave: (product: Product) => void;
}

const ProductEditModal: React.FC<ProductEditModalProps> = ({ isOpen, onClose, product, onSave }) => {
  const [name, setName] = useState<string>(product ? product.name : '');
  const [price, setPrice] = useState<string>(product ? product.price.toString() : '0');
  const [imageUrl, setImageUrl] = useState<string>(product ? product.imageUrl : '');
  const [quantity, setQuantity] = useState<number>(product ? product.quantity : 0);
  const [categoryId, setCategoryId] = useState<number>(product ? product.categoryId : 0);
  const [weightOrVolume, setWeightOrVolume] = useState<string>(product ? product.weightOrVolume.toString() : '0');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedProduct: Product = {
      ...product,
      name,
      price: parseFloat(price),
      imageUrl,
      quantity,
      categoryId,
      weightOrVolume: parseFloat(weightOrVolume)
    } as Product;
    onSave(updatedProduct);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Product"
    >
      <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label>Price (₴):</label>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} min="0" step="0.01" />
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
        </div>
        <div>
          <label>Quantity:</label>
          <input type="number" value={quantity} onChange={e => setQuantity(parseInt(e.target.value, 10))} min="0" />
        </div>
        <div>
          <label>Category ID:</label>
          <input type="number" value={categoryId} onChange={e => setCategoryId(parseInt(e.target.value, 10))} min="0" />
        </div>
        <div>
          <label>Weight or Volume:</label>
          <input type="number" value={weightOrVolume} onChange={e => setWeightOrVolume(e.target.value)} min="0" step="0.01" />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </Modal>
  );
};

export default ProductEditModal;
