import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };
    const incrementQuantity = (productId) => {
        const updatedCart = cart.map(item => {
            if (item.id === productId && item.stock > 0) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCart(updatedCart);
    };
    const decrementQuantity = (productId) => {
        const updatedCart = cart.map(item => {
            if (item.id === productId) {
                const newQuantity = Math.max(0, item.quantity - 1);
                if (newQuantity === 0) {
                    return null;
                }
                return { ...item, quantity: newQuantity };
            }
            return item;
        }).filter(Boolean);
        setCart(updatedCart);
    };
    return (
        <CartContext.Provider value={{ cart, addToCart, incrementQuantity, decrementQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
