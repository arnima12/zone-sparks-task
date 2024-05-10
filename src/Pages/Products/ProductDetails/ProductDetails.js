import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../../../context/cartContext';
import { useAuth } from '../../../context/AuthContext';
const ProductDetails = () => {
    const { isLoggedIn } = useAuth()
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(0);
    const { addToCart } = useCart();
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`https://summerfield.store/products/${productId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }
                const productData = await response.json();
                setProduct(productData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProductDetails();
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }
    console.log(product.variants)

    const handleSizeChange = (size) => {
        setSelectedSize(size);
    };

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    const handleQuantityChange = (value) => {
        const newQuantity = Math.max(1, quantity + value);
        setQuantity(newQuantity);
    };

    const handleAddToCart = () => {
        const selectedVariant = product.variants.find(variant => variant.size === selectedSize && variant.color === selectedColor);

        if (!selectedVariant) {
            console.error('Selected variant not found');
            return;
        }

        const { stock } = selectedVariant;
        const selectedProduct = {
            id: product.id,
            title: product.title,
            size: selectedSize,
            color: selectedColor,
            quantity: quantity,
            price: product.selling_price,
            stock: stock
        };
        console.log("Add To Cart", selectedProduct)
        addToCart(selectedProduct);
    };

    return (
        <div>
            <h1 className="font-bold text-5xl text-center mt-8">Product Details</h1>
            <div className="flex flex-col items-center mt-12 gap-4 px- 4 py-4 border-1 shadow-lg border-blue-400 bg-indigo-400">
                <h2 className="text-3xl font-bold text-center">{product.title}</h2>
                <h3 className="text-2xl font-semibold">{product.category.cat}</h3>
                <h3 className="text-xl font-medium">{product.category.sub}</h3>
                <h3>{product.brand.title}</h3>
                <h4>${product.selling_price}</h4>
                <div className="flex gap-4">
                    <div>
                        <label>Select Size:</label>
                        <br />
                        <select value={selectedSize} onChange={(e) => handleSizeChange(e.target.value)}>
                            <option selected>Select Size</option>
                            {product.variants.map(variant => (
                                <option key={variant.code}>{variant.size}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Select Color:</label>
                        <br />
                        <select value={selectedColor} onChange={(e) => handleColorChange(e.target.value)}>
                            <option selected >Select Color</option>
                            {product.variants.map(variant => (
                                <option key={variant.code}>{variant.color}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Quantity:</label>
                        <br />
                        <button className="bg-white px-2" onClick={() => handleQuantityChange(-1)}>-</button>
                        <span className="px-4 bg-white mx-2">{quantity}</span>
                        <button className="bg-white px-2" onClick={() => handleQuantityChange(1)}>+</button>
                    </div>
                </div>
                {isLoggedIn ? (
                    <Link to="/cart" className="btn btn-white rounded mt-4" onClick={handleAddToCart}>Add to cart</Link>
                ) : (
                    <Link to="/login" className="btn btn-white rounded mt-4">Add To Cart</Link>
                )}

            </div>
        </div>
    );
};

export default ProductDetails;