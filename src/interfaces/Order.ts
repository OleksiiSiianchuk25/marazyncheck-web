export interface User {
    id: number;
    name: string;
    email: string;
    telegram: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
}

export interface OrderedProduct {
    product: Product;
    quantity: number;
    priceAtOrder: number;
}

export interface Order {
    id: number;
    user: User;
    createdAt: string;
    orderedProducts: OrderedProduct[];
}
