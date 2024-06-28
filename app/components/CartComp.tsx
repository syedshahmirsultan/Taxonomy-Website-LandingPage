// "use client"
// import { typeOfCart } from '@/lib/drizzle';
// import singleProductType, { allProductsType } from '@/types';
// import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types';
// import React, { useEffect, useState } from 'react';
// import { handleDelete, productFromIdCart } from './utils/apiCalling';
// import Link from 'next/link';
// import { urlForImage } from '@/sanity/lib/image';
// import { Trash2, ClockIcon } from 'lucide-react';
// import Image from 'next/image';
// import { InputProvider, useInputContext } from './InputContext';
// import Pricing from './Pricing';

// const CartComp = ({data,user}:{data:typeOfCart[], user:KindeUser|null}) => {
//     const [productData, setProductData] = useState<singleProductType[]>([]);
//     const { inputValue } = useInputContext();

//     useEffect(() => {
//         dataGetter();
//       }, [data]);

// async function dataGetter() {
//  const productPromise = data.map((item) => {
//     return productFromIdCart(item.productid);
//         });
//         try {
//             const productData = await Promise.all(productPromise);
//             setProductData(
//               productData.map((item: allProductsType) => {
//                 return item.result[0];
//               })
//             );
//           } catch (error) {
//             console.error("Error fetching product data:", error);
//           }
//           if (data.length === 0) {
//             return (
//                 <div className=" w-full md:max-w-7xl md:mx-auto">
//               <div className="h-16 border border-gray-700 border-dotted w-full p-8 md:p-2   flex flex-col gap-y-4 items-center justify-center  ">
//                 <h2 className="text-2xl font-semibold text-gray-600">
//                   Your Cart is Empty</h2>
//                   <Link href="/products" className="mt-4">
//                   <button className="bg-gray-900 w-40 h-8 p-2 rounded-md text-white font-semibold text-sm">
//                     start Shopping</button>
//                   </Link>
//               </div></div>
//             );
//           }
//         }


//       return (
       
//         <section className="lg:ml-20 ml-2 lg:mb-60 mb-80">
//       <h1 className="text-slate-800 font-bold text-3xl mx-auto flex justify-center lg:justify-start mb-12 mt-12">
//         Shopping Cart
//       </h1>
//       <div className="grid lg:grid-cols-2 gap-4">
//         {productData.map((item, index: number) => (
//           <div
//             key={index}
//             className="flex flex-col gap-4 border rounded-lg p-4 relative"
//           >
//             <div className="flex justify-between items-center">
//               <h2 className="text-lg lg:text-xl text-slate-800 font-bold">
//                 {item.productname}
//               </h2>
//               <Trash2 size={24} color={'red'} onClick={()=>
//                 handleDelete(user?.id as string,item._id)
//               } className="cursor-pointer"/>
//             </div>
//             <div className="flex justify-between items-center">
//               <Image
//                 src={urlForImage(item.image[0])}
//                 width={120}
//                 height={70}
//                 alt="Product Image"
//                 className="object-cover"
//               />
//               <p className="text-gray-950 text-md font-semibold">
//               {inputValue}
//               </p>
//             </div>
//             <p className="text-md text-blue-700 font-semibold">
//               ${item.price}
//             </p>
//             <div className="flex justify-between items-center flex-wrap">
//               <div className="flex items-center">
//                 <ClockIcon size={16} className="mr-1 text-blue-700" />
//                 <p className="text-md text-blue-700 font-semibold">
//                   Estimated Delivery:
//                 </p>
//                 <p className="text-md text-slate-700 font-semibold ml-1">
//                   5 Working Days
//                 </p>
//               </div>
              
//             </div>
//           </div>
//         ))}
//       </div>
//       <InputProvider>
//      <Pricing productData={productData} data={data}/>
//      </InputProvider>
//     </section>
//     );
// }

// export default CartComp;



"use client";

import { typeOfCart } from '@/lib/drizzle';
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types';
import React, { useEffect, useState } from 'react';
import { handleDelete, productFromIdCart } from './utils/apiCalling';
import Link from 'next/link';
import { urlForImage } from '@/sanity/lib/image';
import { Trash2, ClockIcon } from 'lucide-react';
import Image from 'next/image';
import { InputProvider, useInputContext } from './InputContext';
import Pricing from './Pricing';
import singleProductType, { allProductsType } from '@/types';

const CartComp = ({ data, user }: { data: typeOfCart[], user: KindeUser | null }) => {
  const [productData, setProductData] = useState<singleProductType[]>([]);
  const { inputValue } = useInputContext();

  useEffect(() => {
    if (Array.isArray(data)) {
      dataGetter();
    } else {
      console.error("Data is not an array:", data);
    }
  }, [data]);

  async function dataGetter() {
    const productPromise = data.map((item) => productFromIdCart(item.productid));
    try {
      const productData = await Promise.all(productPromise);
      setProductData(
        productData.map((item: allProductsType) => item.result[0])
      );
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="w-full md:max-w-7xl md:mx-auto mt-20">
        <div className="h-60  w-full p-8 flex flex-col gap-y-4 bg-gray-100/60 items-center justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Your Cart is Empty</h2>
          <Link href="/products" className="mt-4">
            <button className="bg-gray-900 w-44 h-12 p-2 rounded-md text-white font-semibold text-sm">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <InputProvider>
      <section className="lg:ml-20 ml-2 lg:mb-60 mb-80">
        <h1 className="text-slate-800 font-bold text-3xl mx-auto flex justify-center lg:justify-start mb-12 mt-12">
          Shopping Cart
        </h1>
        <div className="grid lg:grid-cols-2 gap-4">
          {productData.map((item, index: number) => (
            <div key={index} className="flex flex-col gap-4 border rounded-lg p-4 relative">
              <div className="flex justify-between items-center">
                <h2 className="text-lg lg:text-xl text-slate-800 font-bold">
                  {item.productname}
                </h2>
                <Trash2 size={24} color={'red'} onClick={() => handleDelete(user?.id as string, item._id)} className="cursor-pointer" />
              </div>
              <div className="flex justify-between items-center">
                <Image
                  src={urlForImage(item.image[0])}
                  width={120}
                  height={70}
                  alt="Product Image"
                  className="object-cover"
                />
                <p className="text-gray-950 text-md font-semibold">
                  {inputValue}
                </p>
              </div>
              <p className="text-md text-blue-700 font-semibold">${item.price}</p>
              <div className="flex justify-between items-center flex-wrap">
                <div className="flex items-center">
                  <ClockIcon size={16} className="mr-1 text-blue-700" />
                  <p className="text-md text-blue-700 font-semibold">Estimated Delivery:</p>
                  <p className="text-md text-slate-700 font-semibold ml-1">5 Working Days</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pricing productData={productData} data={data} />
      </section>
    </InputProvider>
  );
};

export default CartComp;
