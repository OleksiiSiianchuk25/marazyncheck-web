import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cart/cartSlice';
import './ShopMain.css';
import { getAllProducts } from '../../services/productService';
import { Product } from '../../interfaces/Product';

interface ShopMainProps {
    searchQuery: string;
}

const ShopMain: React.FC<ShopMainProps> = ({ searchQuery }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [tempSelectedCategories, setTempSelectedCategories] = useState<number[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchFilteredProducts();
    }, [selectedCategories]);

    useEffect(() => {
        if (searchQuery) {
            setFilteredProducts(products.filter(product => 
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        } else {
            setFilteredProducts(products);
        }
    }, [searchQuery, products]);

    const handleCategoryChange = (categoryId: number, isChecked: boolean) => {
        setTempSelectedCategories(prev =>
            isChecked ? [...prev, categoryId] : prev.filter(id => id !== categoryId)
        );
    };

    const applyFilters = async () => {
        setSelectedCategories(tempSelectedCategories);
    };

    const fetchFilteredProducts = async () => {
        const loadedProducts = await getAllProducts(selectedCategories);
        setProducts(loadedProducts);
        setFilteredProducts(loadedProducts);
    };

    const handleAddToCart = (product: Product) => {
        dispatch(addToCart({ product, quantity: 1 }));
    };

    return (
        <div className="shop-main-content">
                <div className="filter-column">
                <h1 className="filter-menu-header">Фільтри</h1>
                <h2 className="type-header">Снеки</h2>
                <label><input type="checkbox" onChange={(e) => handleCategoryChange(1, e.target.checked)} checked={tempSelectedCategories.includes(1)}/><span>чипси</span></label>
                <label><input type="checkbox" onChange={(e) => handleCategoryChange(2, e.target.checked)} checked={tempSelectedCategories.includes(2)}/><span>сухарики</span></label>
                <label><input type="checkbox" onChange={(e) => handleCategoryChange(3, e.target.checked)} checked={tempSelectedCategories.includes(3)}/><span>арахіс</span></label>
                <h2 className="type-header">Солодощі</h2>
                <label><input type="checkbox" onChange={(e) => handleCategoryChange(4, e.target.checked)} checked={tempSelectedCategories.includes(4)}/><span>шоколадки</span></label>
                <label><input type="checkbox" onChange={(e) => handleCategoryChange(5, e.target.checked)} checked={tempSelectedCategories.includes(5)}/><span>печиво</span></label>
                <label><input type="checkbox" onChange={(e) => handleCategoryChange(6, e.target.checked)} checked={tempSelectedCategories.includes(6)}/><span>bonjour</span></label>
                <label><input type="checkbox" onChange={(e) => handleCategoryChange(7, e.target.checked)} checked={tempSelectedCategories.includes(7)}/><span>желейки</span></label>
                <label><input type="checkbox" onChange={(e) => handleCategoryChange(8, e.target.checked)} checked={tempSelectedCategories.includes(8)}/><span>рулетики</span></label>
                <h2 className="type-header">Напої</h2>
                <label><input type="checkbox" onChange={(e) => handleCategoryChange(9, e.target.checked)} checked={tempSelectedCategories.includes(9)}/><span>соки</span></label>
                <label><input type="checkbox" onChange={(e) => handleCategoryChange(10, e.target.checked)} checked={tempSelectedCategories.includes(10)}/><span>газовані напої</span></label>
                <button className="apply-button" onClick={applyFilters}>Застосувати</button>
            </div>
            <div className="goods-column">
                {filteredProducts.map(product => (
                    <div key={product.id} className="product-card">
                        <img className="product-image" src={product.imageUrl} alt={product.name} />
                        <div>{product.name}</div>
                        <div>₴{product.price}</div>
                        <button 
                            className={`buy-button ${product.quantity === 0 ? 'disabled' : ''}`}
                            onClick={() => handleAddToCart(product)}
                            disabled={product.quantity === 0}
                        >
                            Додати до кошика
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShopMain;
