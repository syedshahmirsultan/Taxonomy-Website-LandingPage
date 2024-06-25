// "use client"
// import React, { useState } from 'react';
// import allProducts from '../components/utils/apiCalling';
// import { allProductsType } from '@/types';
// import ProductsList from '../components/ProductsList';
// import Image from 'next/image';
// import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs';


// const Products = async() => {
//   const allproducts:allProductsType = await allProducts();
//   const [showMore,setShowMore] = useState(false)

//   //Handle ShowMore function
//   function handleShowMore(){
//     return setShowMore(!showMore);
//   }
//     return (
//       <div>
//         <div className="w-full m-2 lg:m-0 lg::max-w-7xl mx-auto space-y-4 pb-8 bg-white border border-gray-300 rounded-lg">
// <Image src="/images/products.png" alt="products page image " width={1000} height={200} className='w-full h-40'/>
//   <h1 className="text-gray-900 font-bold text-2xl md:text-3xl">Products</h1>   
//   <p className='text-gray-700 text-md '>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>  
//   {showMore && (<p className="mt-4 text-gray-700 text-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/><br/> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum <br/><br/> dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id <br/><br/>est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.</p>
//   )}<button onClick={()=> handleShowMore()} className='px-4 py-2 bg-gray-100/50 text-gray-900 text-md'>
//     Show {showMore ? 'less' :'more'}
//     </button> </div>
       
//     <div className=' flex flex-cols md:hidden mt-20'>
//           <ProductsList allProductsDetail={allproducts.result} /> 
//         </div>

//        <div className='hidden md:flex md:max-w-6xl md:mx-auto md:mt-20'>
//        <Tabs defaultValue="allProducts" className="w-full m-2 ml-2 md:ml-4 mt-16">
//       <TabsList className=" hidden md:grid   w-[950px] mx-auto md:grid-cols-5">
//         <TabsTrigger value="allProducts">All Products</TabsTrigger>
//         <TabsTrigger value="tims">Tims</TabsTrigger>
//         <TabsTrigger value="james">James</TabsTrigger> 
//         <TabsTrigger value="dave">Dave</TabsTrigger> 
//         <TabsTrigger value="josh">Josh</TabsTrigger> 
//       </TabsList>
//       </Tabs>

       
//         <div className=' mt-20'>
//           <ProductsList allProductsDetail={allproducts.result} /> 
//         </div></div></div>
//     );
// }

// export default Products;

"use client"
import React, { useState, useEffect } from 'react';
import allProducts from '../components/utils/apiCalling';
import { allProductsType } from '@/types';
import ProductsList from '../components/ProductsList';
import Image from 'next/image';
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs';

const Products = () => {
  const [allproducts, setAllProducts] = useState<allProductsType | null>(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await allProducts();
        setAllProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  //Handle ShowMore function
  function handleShowMore() {
    return setShowMore(!showMore);
  }

  return (
    <div>
      <div className="w-full m-2 lg:max-w-6xl  mx-auto space-y-4 pb-8 bg-white border border-gray-300 rounded-lg">
        <Image src="/images/products.png" alt="products page image" width={1000} height={200} className='w-full h-40' />
        <h1 className="text-gray-900 font-bold text-2xl ml-2 lg:ml-6 md:text-3xl">Products</h1>
        <p className='text-gray-700 text-md ml-2 lg:ml-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        {showMore && (
          <p className=" ml-2 lg:ml-6 mt-4 text-gray-700 text-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in <br/><br/> voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.</p>
        )}
        <button onClick={handleShowMore} className='lg:ml-6 ml-2 rounded-lg px-4 py-2 bg-gray-100/50 text-gray-900 font-semibold text-md'>
          Show {showMore ? 'less' : 'more'}
        </button>
      </div>

      <div className='flex flex-cols md:hidden mt-20'>
        {allproducts && <ProductsList allProductsDetail={allproducts.result} />}
      </div>

      <div className='hidden md:flex md:flex-col md:max-w-7xl md:mx-auto md:mt-20'>
        <h2 className="mt-16 text-gray-950 font-bold text-5xl text-center">Filters</h2>
        <Tabs defaultValue="allProducts" className="w-full m-2 ml-2 md:ml-4 mt-8">
          <TabsList className="hidden md:grid w-[500px] p-4 bg-gray-100 mx-auto md:grid-cols-5">
            <TabsTrigger value="allProducts" className="whitespace-nowrap font-bold text-gray-950">All Products</TabsTrigger>
            <TabsTrigger value="tims" className="whitespace-nowrap font-bold text-gray-950">Tims</TabsTrigger>
            <TabsTrigger value="james" className="whitespace-nowrap font-bold text-gray-950">James</TabsTrigger>
            <TabsTrigger value="dave" className="whitespace-nowrap font-bold text-gray-950">Dave</TabsTrigger>
            <TabsTrigger value="josh" className="whitespace-nowrap font-bold text-gray-950">Josh</TabsTrigger>
          </TabsList>
          
        </Tabs>

        
      </div>
    </div>
  );
}

export default Products;
