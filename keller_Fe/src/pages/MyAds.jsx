import React, { useEffect, useState } from "react";
import ProfileSidebar from "../components/ProfileSidebar";
import { FaLocationPin } from "react-icons/fa6";
import { MdFavorite } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { FaTag } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import Banner from "../components/Banner";
import useKellerCall from "../hooks/useKellerCall";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const MyAds = () => {
  const title = `Meine Anzeigen`;
  const { getKellerData } = useKellerCall();
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      const adsData = await getKellerData('ads');
      setAds(adsData);
    };
    fetchAds();
  }, []);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  return (
    <>
      <div>
        <Banner title={title} target={"/allad"} />
      </div>
      <div className="flex">
        <div>
          <ProfileSidebar />
        </div>
        <div className="border w-1/1 m-10 bg-light-grey pb-7 rounded-lg flex-grow">
          <div className="flex justify-between items-center pt-3 pb-3">
            <h1 className="text-3xl ps-5 pt-5">Meine Anzeigen</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-7 my-2">
            {ads.map((ad) => (
              <div key={ad._id} className="bg-white rounded-lg border-2 mb-10 p-5 flex flex-col items-center">
                <Carousel showThumbs={false} dynamicHeight={true} infiniteLoop={true} className="w-full h-40 mb-4">
                  {ad.images.map((image, index) => (
                    <div key={index}>
                      <img
                        src={`${baseUrl}${image}`}
                        alt={`img-${index}`}
                        className="w-full h-40 object-cover"
                      />
                    </div>
                  ))}
                </Carousel>
                <div className="text-center">
                  <h1 className="text-xl font-bold">{ad.title}</h1>
                  <p className="text-sm text-gray-700">{ad.content}</p>
                  <div className="mt-2">
                    <h2 className="text-lg font-semibold">{ad.categoryId.categoryName}</h2>
                    <h3 className="text-md text-gray-600">{ad.subcategoryId.name}</h3>
                  </div>
                  <div className="flex justify-center items-center mt-3 gap-3">
                    <FaLocationPin size={20} />
                    <h4 className="text-sm">{ad.PLZ} {ad.Street}</h4>
                  </div>
                  <div className="flex justify-around px-10 py-4">
                    <div className="flex items-center gap-3">
                      <button className="border-2 border-view-green p-2 rounded-full bg-view-green text-white">
                        <IoEyeSharp size={20} />
                      </button>
                      <p className="text-sm">123</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="border-2 border-like-yellow p-2 rounded-full bg-like-yellow text-white">
                        <MdFavorite size={20} />
                      </button>
                      <p className="text-sm">34</p>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-between items-center mt-4 px-4">
                  <div className="py-2 bg-button-blue shadow-lg shadow-button-blue rounded-md w-1/2 text-center">
                    <p className="text-white text-lg font-bold">{ad.price} €</p>
                  </div>
                  <div className="py-2 bg-view-green shadow-lg shadow-button-blue rounded-md w-1/2 text-center">
                    <p className="text-button-blue text-lg">+49176555444333</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAds;
