// "use client";
// import React from "react";
// import Link from "next/link";
// import { signOut, useSession } from "next-auth/react";

// const Navbar = () => {
//   const { data: session }: any = useSession();
//   return (
//     <div className=" max-w-full bg-gray-700 rounded-lg">
//       <ul className="flex justify-between items-center  p-4">
//         <div>
//           <Link href="/">
//             <li>
//               <img src="/favicon.ico" className="h-12" alt="Logo" />
//             </li>
//           </Link>
//         </div>
//         <div className="flex gap-10">
//           <Link href="/" passHref>
//             <li className="hover:text-gray-300">Home</li>
//           </Link>
//           <Link href="/hackathon" passHref>
//             <li className="hover:text-gray-300">Hackathons</li>
//           </Link>
//           <Link href="/" passHref>
//             <li className="hover:text-gray-300">
//               Search
//             </li>
//           </Link>
//           {session?(<Link href="/chat" passHref>
//             <li className="hover:text-gray-300">Chat</li>
//           </Link>):(<></>)}
//           {!session ? (
//             <Link href="/login" passHref>
//               <li className="hover:text-gray-300">Login</li>
//             </Link>
//           ) : (
//             <>
//               <Link href="/profile" passHref>
//                 <li className="hover:text-gray-300">Profile</li>
//               </Link>
//               <li>
//                 <button
//                   onClick={() => signOut()}
//                   className="p-2 px-5 -mt-1 bg-blue-800 rounded-full hover:bg-blue-600 transition duration-300"
//                 >
//                   Logout
//                 </button>
//               </li>
//             </>
//           )}
//         </div>
//       </ul>
//     </div>
//   );
// };

// export default Navbar;



"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { FiAlignRight } from "react-icons/fi"

const Navbar = () => {
  const { data: session }: any = useSession();
  return (
    <div className=" w-screen bg-[rgb(10,1,31)] rounded-lg border-b border-gray-500 ">
      <div className="mx-4">
      <ul className="flex justify-between items-center  p-4">
        <div className="">
          <Link href="/">
            <li>
              <img src="/favicon.ico" className="h-12" alt="Logo" />
            </li>
          </Link>
        </div>
        <div className="flex gap-10   ">
          <div className="flex gap-10  invisible md:visible " >
          <Link href="/" passHref>
            <li className="hover:text-gray-300 text-sm align-middle pt-2 font-serif">Home</li>
          </Link>
          <Link href="/hackathon" passHref>
            <li className="hover:text-gray-300 text-sm pt-2 font-serif">Hackathons</li>
          </Link>
          <Link href="/" passHref>
            <li className="hover:text-gray-300 text-sm pt-2 font-serif">
              Search
              {/* Need to add input */}
            </li>
          </Link>
          </div>
          {!session ? (
            <Link href="/login" passHref>
              <li className="hover:text-gray-300 bg-[rgb(175,129,235)] px-6 text-sm text-black py-2 rounded-3xl font-serif ">Login</li>
            </Link>
          ) : (
            <>
              <Link href="/profile" passHref>
                <li className="hover:text-gray-300 font-serif">Profile</li>
              </Link>
              
              <li className="">
                <button
                  onClick={() => signOut()}
                  className="p-2 px-5 -mt-1 bg-blue-800 rounded-full hover:bg-blue-600 transition duration-300 "
                >
                  Logout
                </button>
              </li>
            </>
          )}
          <div className="visible md:invisible md:absolute mt-2">
            <FiAlignRight />
          </div>
        </div>
        

      </ul>
      </div>
    </div>
  );
};

export default Navbar;
