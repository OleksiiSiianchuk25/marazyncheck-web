import React, { useEffect, useState } from "react";
import './ShopMain.css';
import { getAllProducts } from '../../services/productService'; // Adjust path as necessary
import { Product } from '../../interfaces/Product'; // Adjust path as necessary

const ShopMain: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const loadedProducts = await getAllProducts();
            setProducts(loadedProducts);
        };

        fetchProducts();
    }, []);

    return (
        <div className="shop-main-content">
            <div className="filter-column">
                <h1 className="filter-menu-header">Фільтри</h1>
                <h2 className="type-header">Снеки</h2>
                <label><input type="checkbox"/><span>Чіпси</span></label>
                <label><input type="checkbox"/><span>Сухарики</span></label>
                <label><input type="checkbox"/><span>Горішки</span></label>
                {/* Continue with other filters */}
            </div>
            <div className="goods-column">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <img className="product-image" src={product.imageUrl} alt={product.name} />
                        <div>{product.name}</div>
                        <div>₴{product.price}</div>
                        <button className="buy-button">Купити</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShopMain;
