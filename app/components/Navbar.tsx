"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaPhoneVolume } from "react-icons/fa";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import ContactInfo from "@/components/Content/ContactInfo.json";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  const navLinks=["Home", "Locations", "Services", "About", "Blogs", "Contact"]
  return (
    <>
      <nav className=" sticky   top-0 z-[999] flex h-[5rem]  w-screen items-center justify-center border-y-2 bg-white px-4 md:w-full md:px-0">
        <div className=" relative w-screen md:w-full md:max-w-[1280px] md:px-10  md:py-4">
          <div className="mt-0 flex flex-row justify-between space-x-8 rounded-2xl rounded-tr-none px-4 text-sm font-medium md:mr-6 md:justify-around">
            <div className="flex ">
              <Link href={ContactInfo?.baseUrl} aria-label="Home">
                <Image
                  src={ContactInfo?.logoImage}
                  className=" h-full w-40 object-contain md:mr-3 md:w-56 "
                  alt="logo of the company"
                  title=""
                  loading="lazy"
                  width={1000}
                  height={1000}
                />
              </Link>
            </div>
            <ul className=" mr-6 mt-0 hidden   flex-row items-center justify-around space-x-8 text-lg font-medium md:flex ">
              {navLinks.map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={
                        item.toLowerCase() === "home"
                          ? `/`
                          : `/${item.toLowerCase().split(" ").join("-")}`
                      }
                      className="under  text-black decoration-minor decoration-2  duration-150 ease-in-out hover:underline "
                      aria-current="page"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
            <div className="  hidden items-center justify-center lg:flex   ">
              <a id="cta-id" href={`tel:${ContactInfo.tel}`}>
                <button
                  id="cta-id"
                  className="flex items-center justify-center rounded bg-main px-2 py-2 text-sm font-bold text-white   duration-200 ease-in-out hover:border-2 hover:border-main hover:bg-white hover:text-black md:px-4"
                >
                  <FaPhoneVolume className="text-3xl " />
                  {ContactInfo.No}
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className="relative z-10 sm:hidden " onClick={handleNav}>
          {nav ? (
            <AiOutlineClose size={25} className="text-white" />
          ) : (
            <AiOutlineMenu size={25} />
          )}
        </div>
        <div
          className={
            nav
              ? " absolute bottom-0 left-0 right-0 top-0 flex   h-screen w-full items-center justify-center border border-main bg-main text-4xl text-white  duration-300 ease-in sm:hidden"
              : "absolute bottom-0 left-[-100%] right-0 top-0 flex   h-screen w-full items-center justify-center border border-main bg-main text-4xl text-white  duration-300 ease-in sm:hidden"
          }
        >
          {/* <ul>
            {["Home", "Locations","Services", "About", "Contact"].map((item) => (
              <li key={item}>
                <Link
                onClick={handleNav}
                href={
                  item.toLowerCase() === "home"
                    ? `${ContactInfo?.baseUrl}`
                    : `${ContactInfo?.baseUrl}${item.toLowerCase().split(" ").join("-")}`
                }
                  className="under text-white font-semibold decoration-main decoration-2  duration-150 ease-in-out hover:underline "
                  aria-current="page"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul> */}
          <div className=" flex h-full w-full flex-col justify-around p-6 py-10 font-medium">
            <div className="">
              {/* <div className="text-xl font-bold ">Menu</div> */}
              <ul className="relative mt-5 flex flex-col gap-6 text-4xl font-semibold ">
                {navLinks.map(
                  (item) => (
                    <li key={item}>
                      <Link
                        onClick={handleNav}
                        href={
                          item.toLowerCase() === "home"
                            ? `/`
                            : `/${item.toLowerCase().split(" ").join("-")}`
                        }
                        className="under font-semibold text-white decoration-main decoration-2  duration-150 ease-in-out hover:underline "
                        aria-current="page"
                      >
                        {item}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

// "use client";
// import Link from "next/link";
// import React from "react";
// import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// const Navbar = () => {
//   const [nav, setNav] = useState(false);
//   const [color, setColor] = useState("transparent");
//   const [textcolor, setTextColor] = useState("#FF6000");
//   const [flex, setFlex] = useState("");
//   const handleNav = () => {
//     setNav(!nav);
//   };

//   useEffect(() => {
//     const changeColor = () => {
//       if (window.scrollY >= 90) {
//         setColor("#1e60aa");
//         setTextColor("#ffffff");
//         setFlex("flex flex-row-reverse ");
//       } else {
//         setColor("transparent");
//         setTextColor("#ff6000");
//         setFlex("");
//       }
//     };
//     window.addEventListener("scroll", changeColor);
//     return () => {
//       window.removeEventListener("scroll", changeColor);
//     };
//   }, []);

//   return (
//     <div className=" ">
//       <div
//         style={{ backgroundColor: `${color}` }}
//         className=" fixed left-0 z-50   w-full bg-[#444444] text-2xl duration-500 ease-in "
//       >
//         <div className="m-auto flex  w-full max-w-[1280px] items-center justify-between p-4 text-white ">
//           <div
//             className={` text-3xl font-bold text-[${textcolor}] text-center ${flex} items-center justify-center gap-3 px-2`}
//           >
//             {/* <p className='mb-2'>LOGO</p> */}
//             <Link href="/">
//               <Image
//                 src="/logo.png"
//                 alt="logo"
//                 width={100}
//                 height={100}
//                 className=" -ml-4 w-40"
//               />
//             </Link>
//           </div>
//           <div className={`${flex} items-center  justify-center   gap-2`}>
//             <div className="mb-2 ml-4 hidden justify-center gap-3 text-white  lg:flex">
//               <Link href="tel:8882716884">
//                 {" "}
//                 <button
//                   aria-label="Call"
//                   className={`  rounded-full rounded-se-none bg-minor px-4 py-2 text-center hover:border-2 hover:bg-transparent`}
//                 >
//                   Call Us (888) 271-6884{" "}
//                 </button>
//               </Link>
//               {/* <button className={`  text-center bg-[#f76610] rounded-lg px-2 hover:bg-[#c25210] hover:border-2 hover:bg-transparent`}>REQUEST AN APPOINTMENT </button> */}
//             </div>
//             <ul
//               className={`text-[${textcolor}] relative z-10 mr-10 hidden justify-between gap-4 sm:flex`}
//             >
//               <li className=" ">
//                 <Link href="/">Home</Link>
//               </li>

//               <li className="">
//                 <Link href="/locations">Location</Link>
//               </li>

//               <li className="">
//                 <Link href="/blog">Blogs</Link>{" "}
//               </li>

//               <li className="">
//                 <Link href="/contact">Contact</Link>{" "}
//               </li>

//               <li className="">
//                 <Link href="/about">About</Link>{" "}
//               </li>
//             </ul>
//           </div>
//           <div
//             style={{ color: `${textcolor}` }}
//             className=" z-10 sm:hidden  "
//             onClick={handleNav}
//           >
//             {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
//           </div>
//           <div
//             className={
//               nav
//                 ? " absolute bottom-0 left-0 right-0 top-0 flex   h-screen w-full items-center justify-center border border-gray-950 bg-black text-4xl text-white  duration-300 ease-in sm:hidden"
//                 : "absolute bottom-0 left-[-100%] right-0 top-0 flex   h-screen w-full items-center justify-center border border-gray-950 bg-black text-4xl text-white  duration-300 ease-in sm:hidden"
//             }
//           >
//             <ul style={{ color: `${textcolor}` }}>
//               <Link href="/">
//                 <li className="p-4 text-white  hover:text-gray-600">Home</li>
//               </Link>
//               <Link href="/blog">
//                 <li className="p-4 text-white hover:text-gray-600">Blog</li>
//               </Link>
//               <Link href="/about">
//                 <li className="p-4 text-white hover:text-gray-600">About</li>
//               </Link>
//               <Link href="/contact">
//                 <li className="p-4 text-white hover:text-gray-600">Contact</li>
//               </Link>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
