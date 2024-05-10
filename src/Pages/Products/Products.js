import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [brandFilter, setBrandFilter] = useState('');
    const [priceRangeFilter, setPriceRangeFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [pages, setPages] = useState(1);
    useEffect(() => {
        fetchProducts();
    }, [page]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://summerfield.store/products/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            console.log(data)
            setProducts(data.products);
            setPages(data.pages);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const brands = Array.from(new Set(products.map(product => product.brand.title)));
    const priceRanges = ['Low', 'Medium', 'High'];
    const getPriceRange = (price) => {
        if (price < 500) {
            return priceRanges[0];
        } else if (price >= 500 && price < 1000) {
            return priceRanges[1];
        } else {
            return priceRanges[2];
        }
    };

    const filteredProducts = products.filter(product => {
        const categoryMatch = categoryFilter === '' || product.category.cat.toLowerCase().includes(categoryFilter.toLowerCase()) ||
            product.category.sub.toLowerCase().includes(categoryFilter.toLowerCase());
        const brandMatch = brandFilter === '' || product.brand.title.toLowerCase().includes(brandFilter.toLowerCase());
        const priceRangeMatch = priceRangeFilter === '' || getPriceRange(product.selling_price) === priceRangeFilter;
        const searchMatch = searchQuery === '' ||
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.cat.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.sub.toLowerCase().includes(searchQuery.toLowerCase()) || product.brand.title.toLowerCase().includes(searchQuery.toLowerCase())

        return categoryMatch && brandMatch && priceRangeMatch && searchMatch;
    });

    const handleCategoryChange = (e) => {
        setCategoryFilter(e.target.value)
        setPage(1);
    };

    const handleBrandChange = (e) => {
        setBrandFilter(e.target.value);
        setPage(1);
    };

    const handlePriceRangeChange = (e) => {
        setPriceRangeFilter(e.target.value);
        setPage(1);
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
        setPage(1);
    };

    return (
        <div>
            <div>
                <div className="flex justify-center my-8">
                    <input type="text" placeholder="Search products" className="input input-primary" value={searchQuery} onChange={handleSearchInputChange} />
                </div>
                <div className="flex justify-between mt-8">
                    <select className="select select-info w-full max-w-xs" onChange={handleCategoryChange}>
                        <option selected>All Categories</option>
                        {products.map((product, index) => (
                            <optgroup label={product.category.cat} key={index}>
                                <option>{product.category.sub}</option>
                            </optgroup>
                        ))}
                    </select>
                    <select className="select select-info w-full max-w-xs" onChange={handleBrandChange}>
                        <option selected>All Brands</option>
                        {brands.map((brand, index) => (
                            <option key={index}>{brand}</option>
                        ))}
                    </select>
                    <select className="select select-info w-full max-w-xs" onChange={handlePriceRangeChange}>
                        <option selected>All Price Range</option>
                        {priceRanges.map((range, index) => (
                            <option key={index}>{range}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="mt-8 ">
                <h1 className="text-4xl font-bold text-center">All Products</h1>
                <div className="container px-4 sm:px-5 md:px-10 lg:px-16 my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto mt-8 gap-8">
                    {filteredProducts.map(product => (
                        <li className="list-none" key={product.id}>
                            <h2 className="text-2xl font-bold h-24">{product.title}</h2>
                            <h3 className="text-xl font-semibold">{product.category.cat}</h3>
                            <h3 className="text-xl font-medium">{product.category.sub}</h3>
                            <h3>{product.brand.title}</h3>
                            <h4 className="font-bold">${product.selling_price}</h4>
                            <Link to={{
                                pathname: `/products/${product.id}`,
                                state: { product }
                            }} className="btn btn-outline btn-info mt-4">See Details</Link>
                        </li>
                    ))}
                </div>
                {loading && <p>Loading...</p>}
                {!loading && pages > 1 && (
                    <div className="join my-8 flex justify-center">
                        {[...Array(pages).keys()].map((pageNumber) => (
                            <button
                                key={pageNumber + 1}
                                className={`join-item btn bg-indigo-400 ${pageNumber + 1 === page ? 'btn-active' : ''}`}
                                onClick={() => setPage(pageNumber + 1)}
                            >
                                {pageNumber + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div >
    );
};

export default Products;
