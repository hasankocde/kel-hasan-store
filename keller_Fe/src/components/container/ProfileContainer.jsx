import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useKellerCall from "../../hooks/useKellerCall";
import ProfileContainer2 from "./ProfileContainer2";

const ProfileContainer = () => {
  const { postKellerData, putKellerData, getAddressData } = useKellerCall();

  const [address, setAddress] = useState({
    street: "",
    zipCode: "",
    homeNumber: "",
    city: "",
    country: "",
    doorbellName: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [addressId, setAddressId] = useState(null);

  useEffect(() => {
    getAddressData().then((data) => {
      if (data) {
        setAddress(data);
        setAddressId(data._id);
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await putKellerData(`addresses`, { _id: addressId, ...address });
    } else {
      const createdAddress = await postKellerData('addresses', address);
      if (createdAddress) {
        setAddress(createdAddress);
        setAddressId(createdAddress._id);
      }
    }
    setIsEditing(false);
  };

  return (
    <div className="border w-full m-10 bg-light-grey pb-7 rounded-lg">
      <h1 className="text-4xl font-bold ps-5 pt-5">Profile</h1>
      <div className="flex justify-between items-start pt-3 pb-3">
        <div className="w-1/2 pr-1">
          <div className="bg-white mx-7 my-2 rounded-lg border-2 mb-10">
            <ProfileContainer2 />
          </div>
        </div>
        <div className="w-1/2 pl-1" style={{ paddingRight: '10mm' }}>
          <div className="bg-white mx-7 my-2 rounded-lg border-2 mb-10">
            <div className="px-16 pt-3">
              <h1 className="text-xl border-b-2 border-button-blue text-button-blue uppercase">
                ADRESSE
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="my-5">
                  <label>
                    Street:
                    <input
                      type="text"
                      name="street"
                      value={address.street}
                      onChange={handleChange}
                      className="ml-2 border rounded px-2 py-1 w-full"
                      disabled={!isEditing}
                    />
                  </label>
                </div>
                <div className="my-5">
                  <label>
                    Home Number:
                    <input
                      type="number"
                      name="homeNumber"
                      value={address.homeNumber}
                      onChange={handleChange}
                      className="ml-2 border rounded px-2 py-1 w-full"
                      disabled={!isEditing}
                    />
                  </label>
                </div>
                <div className="my-5">
                  <label>
                    Zip Code:
                    <input
                      type="number"
                      name="zipCode"
                      value={address.zipCode}
                      onChange={handleChange}
                      className="ml-2 border rounded px-2 py-1 w-full"
                      disabled={!isEditing}
                    />
                  </label>
                </div>
                <div className="my-5">
                  <label>
                    City:
                    <input
                      type="text"
                      name="city"
                      value={address.city}
                      onChange={handleChange}
                      className="ml-2 border rounded px-2 py-1 w-full"
                      disabled={!isEditing}
                    />
                  </label>
                </div>
                <div className="my-5">
                  <label>
                    Country:
                    <input
                      type="text"
                      name="country"
                      value={address.country}
                      onChange={handleChange}
                      className="ml-2 border rounded px-2 py-1 w-full"
                      disabled={!isEditing}
                    />
                  </label>
                </div>
                <div className="my-5">
                  <label>
                    Doorbell Name:
                    <input
                      type="text"
                      name="doorbellName"
                      value={address.doorbellName}
                      onChange={handleChange}
                      className="ml-2 border rounded px-2 py-1 w-full"
                      disabled={!isEditing}
                    />
                  </label>
                </div>
                {!isEditing && (
                  <div className="my-5">
                    <button
                      type="button"
                      className="bg-button-blue text-white py-2 px-4 rounded w-full"
                      onClick={() => setIsEditing(true)}
                    >
                      Adressaktualisierung
                    </button>
                  </div>
                )}
                {isEditing && (
                  <div className="my-5">
                    <button
                      type="submit"
                      className="bg-button-blue text-white py-2 px-4 rounded w-full"
                    >
                      Jetzt aktualisieren
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;
