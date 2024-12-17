import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetails() {
  const { product_id } = useParams();
  const [Product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  

  const fetchProduct = () => {
    axios.get(`https://dummyjson.com/products/${product_id}`)
      .then((response) => {
        if (response.status === 200) {
          setProduct(response.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  useEffect(() => {
    if (product_id != null) {
      fetchProduct();
    }
  }, [product_id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Image Section */}
        <div className="lg:w-1/2">
          <img
            src={Product.thumbnail}
            alt={Product.title}
            className="w-full h-auto rounded-md shadow-lg"
          />
          <div className="grid grid-cols-3 gap-2 mt-4">
            {Product.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${Product.title} - ${index + 1}`}
                className="w-full h-24 object-cover rounded-md shadow"
              />
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{Product.title}</h1>
          <p className="text-gray-600 text-sm">{Product.category}</p>
          <p className="text-gray-900 text-2xl font-semibold mt-2">${Product.price}</p>
          <p className="text-sm text-gray-500">Discount: {Product.discountPercentage}%</p>
          <p className="mt-4 text-gray-700">{Product.description}</p>
          
          {/* Stock and Availability */}
          <p className={`mt-4 text-sm ${Product.availabilityStatus === "Low Stock" ? "text-red-500" : "text-green-500"}`}>
            {Product.availabilityStatus}
          </p>

          {/* Additional Details */}
          <div className="mt-6">
            <p className="font-semibold text-gray-700">SKU: {Product.sku}</p>
            <p className="font-semibold text-gray-700">Brand: {Product.brand}</p>
            <p className="text-sm text-gray-500">Weight: {Product.weight}g</p>
            <p className="text-sm text-gray-500">
              Dimensions: {Product.dimensions?.width} x {Product.dimensions?.height} x {Product.dimensions?.depth} mm
            </p>
            <p className="text-sm text-gray-500">Warranty: {Product.warrantyInformation}</p>
            <p className="text-sm text-gray-500">Shipping: {Product.shippingInformation}</p>
          </div>

          {/* Return Policy */}
          <p className="mt-6 text-sm text-gray-600">
            <span className="font-semibold">Return Policy:</span> {Product.returnPolicy}
          </p>

          {/* Reviews Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">Customer Reviews</h3>
            {Product.reviews?.map((review, index) => (
              <div key={index} className="mt-4 p-4 border rounded-md bg-gray-50">
                <p className="text-gray-700 font-semibold">
                  {review.reviewerName} - {review.rating} ⭐
                </p>
                <p className="text-sm text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
