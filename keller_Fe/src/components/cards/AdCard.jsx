import React from "react";
import { FaLocationPin } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";

const posts = [
  {
    img: "https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    href: "/detail",
  },
  {
    img: "https://images.unsplash.com/photo-1620287341056-49a2f1ab2fdc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    href: "/detail",
  },
  {
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    href: "/detail",
  },
  {
    img: "https://images.unsplash.com/photo-1617529497471-9218633199c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    href: "/detail",
  },
];

const AdCard = () => {
  return (
    <section className=" mx-auto px-4 max-w-screen-xl md:px-8">
      <div className=" grid gap-7 sm:grid-cols-2 lg:grid-cols-4 xxl:grid-cols-6">
        {posts.map((items, index) => (
          <article
            className="max-w-md mx-auto mt-4 shadow-2xl border rounded-lg duration-300 hover:shadow-sm bg-background-grey"
            key={index}
          >
            <a href={items.href}>
              <img
                src={items.img}
                loading="lazy"
                alt={items.title}
                className="w-full h-48 rounded-t-md"
              />
              <div className="border-b-2 border-gray-400 text-center mt-2 pt-3 ml-4 mr-2">
                <h2>Category</h2>
              </div>
              <div className="border-b-2 border-gray-400 pb-3 pt-3 ml-4 mr-2 mb-3 text-gray-900">
                <div>
                  <h3 className="text-center text-xl text-gray-900">
                    Lorem ipsum dolor sit amet consectetur.
                  </h3>
                </div>
                <div className="mt-3">
                  <div className="flex mb-3 gap-3 ">
                    <FaLocationPin size={20} />
                    <h1>Location</h1>
                  </div>
                  <div className="flex gap-3 ">
                    <FaClock size={20} />
                    <h1>Ad create Date</h1>
                  </div>
                </div>
              </div>
              <div className="px-5 pb-3 flex justify-between">
                <div>
                  <h1 className="text-2xl font-semibold">$700</h1>
                </div>
                <div>
                  <MdFavorite size={25} />
                </div>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AdCard;
