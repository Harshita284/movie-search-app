import React, { useContext, useEffect, useState } from 'react'
import {useParams, useSearchParams} from 'react-router-dom'
import Container from '../components/Container'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoGridOutline } from "react-icons/io5";
import { FaThList } from "react-icons/fa";
import { Context } from '../context/Main';

export default function Home() {
    const [Categories, setCategories] = useState([]);
    const [Products, setProduct] = useState([]);
    const [totalProducts, setTotalProducts] = useState({});
    const [listing_mode,setListingMode] = useState(0);
    const { category_slug } = useParams();
    const [page, setpage] = useState(0);
    const [searchQuery,setSearchQuery] = useSearchParams();
    //0  => grid
    //1 => list

    // console.log(searchQuery);

    const limit = 30 ;
     
    useEffect(
        () => {
            fetchCategory();
            const search_page = searchQuery.get('page');
            if(search_page != null){
                setpage(Number(search_page));
            }
        },[]
    )


    const fetchCategory = () => {
        
        axios.get("https://dummyjson.com/products/categories")
        .then(//fullfilled
            (response) => {
                if(response.status == 200){
                    setCategories(response.data);
                }                
            }

        ).catch(//rejected
            (error) => {
                  console.log(error.message);
            }
        )

    }

    const fetchProduct = () => {
        const skip = (searchQuery.get('page') ?? page) * limit;
        let API = "https://dummyjson.com/products";

        if(category_slug != undefined){
            API += `/category/${category_slug}`
        }else{
            API += `?limit=${limit}&skip=${skip}`;
        }

        axios.get(API)
        .then(//fullfilled
            (response) => {
                if(response.status == 200){
                    setProduct(response.data.products);
                    setTotalProducts(response.data.total);
                }                
            }

        ).catch(//rejected
            (error) => {
                  console.log(error.message);
            }
        )

    }

    useEffect(() => {
      fetchProduct();
    
    }, [category_slug,page])

    const pageHandler = (page_number) => {
        setSearchQuery({page: page_number});
            setpage(page_number);
    }
    

  return (
    <Container>
        <div className=' grid grid-cols-4 my-3 gap-1'>
            <div>
                <div className='text-center p-2 mb-2 bg-[#34495e] text-white text-lg'>Category</div>
                    <CategoryListing category_slug={category_slug} data={Categories} />                
            </div>
            <div className='col-span-3'>
            <Pagination current_page={page} pageHandler={pageHandler} limit={limit} total_records={totalProducts} />
                
            <div className='flex gap-2 p-3 mt-3 justify-end text-center mb-2 bg-[#34495e] text-white text-lg'>
               <IoGridOutline  className={`${listing_mode == 0 && 'text-yellow-500'}`} onClick={() => setListingMode(0)} />
               <FaThList className={`${listing_mode == 1 && 'text-yellow-500'}`} onClick={() => setListingMode(1)} />
            </div>
                <ProductListing listing_mode={listing_mode} data={Products}/>
            </div>            
        </div>
    </Container>
  )
}

const ProductListing = ({data, listing_mode}) => {
    
    const { addtoCart } = useContext(Context);
    return (
        <div className={`
            grid ${listing_mode === 0 ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3' : 'grid-cols-1'
        } gap-2 sm:gap-4`}
      >
        {data.map((prod) => {
          return (
            <div
              key={prod.id}
              className={`border group relative p-3 ${
                listing_mode === 1 ? 'flex items-center' : ''
              }`}
            >
              {/* Image Section */}
              <div
                className={`${
                  listing_mode === 0 ? 'aspect-w-1 aspect-h-1' : 'w-1/3'
                } w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75`}
              >
                <Link to={`/product-details/${prod.id}`}>
                  <img
                    src={prod.thumbnail}
                    alt={`${prod.title} thumbnail`}
                    className="h-full w-full object-cover object-center"
                  />
                </Link>
              </div>
      
              {/* Product Details */}
              <div
                className={`mt-4 ${
                  listing_mode === 1 ? 'ml-4 flex-1' : 'flex justify-between'
                }`}
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    <Link to={`/product-details/${prod.id}`}>
                      <span aria-hidden="true" className="inset-0" />
                      {prod.title}
                    </Link>
                  </h3>
                  {listing_mode === 1 && <p className="mt-1 text-sm text-gray-500">{prod.description}</p>}
                  <p className="mt-1 text-sm text-gray-500">{prod.brand}</p>
                  <button
                    onClick={() => addtoCart(prod.id)}
                    className="hover:bg-blue-600 hover:text-white border px-4 py-1 mt-2 text-sm transition-colors"
                  >
                    + Cart
                  </button>
                </div>
                <p className="text-sm font-medium text-gray-900">$ {prod.price}</p>
                {listing_mode === 1 && (
                  <p className="mt-1 text-sm text-gray-500">{prod.availabilityStatus}</p>
                )}
              </div>
            </div>
          );
        })}
        </div>
      
    )
}

const CategoryListing = ({data,category_slug}) => {
    return(
        <ul className="flex flex-wrap justify-center gap-2 sm:gap-4">
            <li
                className={`text-gray-700 border p-1 sm:p-2 rounded cursor-pointer ${
                category_slug === undefined && 'bg-blue-600 text-white'
                }`}
            >
                <Link to="/">All</Link>
            </li>
            {data.map((item, index) => {
                return (
                <li
                    className={`border p-1 sm:p-2 rounded cursor-pointer ${
                    category_slug === item.slug && '!bg-blue-600 text-white'
                    }`}
                    key={index}
                >
                    <Link to={`/${item.slug}`}>{item.name}</Link>
                </li>
                );
            })}
        </ul>


    )

}

const Pagination = ({current_page,pageHandler,total_records,limit}) => {


    const totalpages = Math.ceil(total_records/limit);
    // console.log(totalpages);
    const pageElem = [];
    if(isNaN(totalpages)== false){
        for(let i = 0; i < totalpages; i++){
            pageElem.push(
                <li key={i}>
                <span onClick={() => pageHandler(i)}
                href="#"
                className={`cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 
                dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 
                dark:hover:bg-gray-700 dark:hover:text-white ${i == current_page && '!bg-blue-600 text-white'} sm:px-4 sm:h-9 lg:px-5 lg:h-10`}>
               {i + 1}
                </span>
            </li>
            )
        }
    }
    return(
        <>
            
            <nav aria-label="Page navigation" className="my-4">
                <ul className="flex flex-wrap justify-center items-center -space-x-px text-xs sm:text-sm">
                    <li>
                    <span
                        style={{ pointerEvents: current_page === 0 && 'none' }}
                        onClick={() => pageHandler(current_page - 1)}
                        className="flex items-center justify-center px-2 sm:px-3 h-8 sm:h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        Previous
                    </span>
                    </li>
                    {pageElem}
                    <li>
                    <span
                        style={{ pointerEvents: current_page === totalpages - 1 && 'none' }}
                        onClick={() => pageHandler(current_page + 1)}
                        className="flex items-center justify-center px-2 sm:px-3 h-8 sm:h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        Next
                    </span>
                    </li>
                </ul>
            </nav>

        </>
    )
}