import React from 'react';
import { useCart } from '../../context/cartContext';

const Cart = () => {
    const { cart, incrementQuantity, decrementQuantity } = useCart();
    const handleIncrement = (productId) => {
        const product = cart.find(item => item.id === productId);
        if (product.quantity < product.stock) {
            incrementQuantity(productId);
        } else {
            alert("Product is out of stock!");
        }
    };
    const grandTotal = cart.reduce((total, cartProduct) => {
        return total + (cartProduct.price * cartProduct.quantity);
    }, 0);
    return (
        <div>
            <div className="overflow-x-auto shadow-lg  bg-indigo-400">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Size</th>
                            <th>Color</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                    {cart.map((cartProduct) => (
                        <tr key={cartProduct.id}>
                            <th className="text-2xl font-bold">{cartProduct.title}</th>
                            <th className="text-xl font-semibold">{cartProduct.size}</th>
                            <th className="text-xl font-medium">{cartProduct.color}</th>
                            <th className="my-4"><button className="bg-white px-2" onClick={() => decrementQuantity(cartProduct.id)}>-</button><span className="px-2 bg-white mx-2">{cartProduct.quantity}</span><button className="bg-white px-2" onClick={() => handleIncrement(cartProduct.id)}>+</button></th>
                            <h3>${cartProduct.price * cartProduct.quantity}</h3>
                            {cartProduct.quantity < cartProduct.stock ? (
                                <p>Available in stock</p>
                            ) : (
                                <p>Out of stock</p>
                            )}

                        </tr>
                    ))}
                </table>
            </div>

            <div>
                <h2 className="text-3xl font-semibold text-center mt-4">Grand Total: ${grandTotal}</h2>
            </div>
        </div>
    );
};

export default Cart;