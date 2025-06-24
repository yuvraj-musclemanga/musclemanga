"use client";

import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase.config";
import { addDoc, collection, DocumentData, getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setAddress } from "@/redux/slices/cartSlice";

const Page = () => {
  const [addresses, setAddresses] = useState<DocumentData[]>([]);
  const [name, setReciepientName] = useState("");
  const [email, setReciepientEmail] = useState("");
  const [phone, setReciepientPhone] = useState("");
  const [adres, setAdres] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAddress] = useState<DocumentData>();

  const getData = async () => {
    let adrses: DocumentData[] = [];
    const snapshot = await getDocs(
      collection(db, `users/${auth.currentUser?.uid}`, "addresses")
    );
    snapshot.forEach((doc) => {
      adrses = [...adrses, doc.data()];
    });
    setAddresses(adrses);
  };

  const saveAddress = async () => {
    await addDoc(collection(db, `users/${auth.currentUser?.uid}/addresses`), {
      name,
      phone,
      email,
      address: adres,
      landmark,
      city,
      state,
      pin,
    });
    dispatch(
      setAddress({
        name,
        phone,
        email,
        address: adres,
        landmark,
        city,
        state,
        pin,
      })
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full flex flex-col gap-6 p-4 font-[playfair]">
      <div className="w-full flex flex-col items-center gap-4">
        <p className="text-2xl font-medium">Select an address</p>
        {addresses && addresses.length > 0 ? (
          <div className="flex flex-col gap-4">
            {addresses.map((address, index) => (
              <div
                className="w-full rounded-xl flex flex-col bg-gray-100 px-3 py-3 shadow-md"
                key={index}
                onClick={() => setSelectedAddress(address)}
              >
                <p className="font-semibold">👤 {address.name}</p>
                <p className="font-semibold">📞 +91{address.phone}</p>
                <p>✉️ {address.email}</p>
                <p>
                  🏠{" "}
                  {address.address +
                    " near " +
                    address.landmark +
                    ", " +
                    address.city +
                    ", " +
                    address.state +
                    " - " +
                    address.pin}
                </p>
              </div>
            ))}
            <button
              className="w-full bg-black text-white p-3 text-xl rounded-2xl"
              onClick={() => dispatch(setAddress(selectedAddress))}
            >
              Continue →
            </button>
          </div>
        ) : (
          <div className="w-full min-h-[30vh] flex justify-center items-center">
            <p>No saved addresses!</p>
          </div>
        )}
      </div>
      <hr />
      <div className="w-full flex flex-col items-center gap-2">
        <p className="text-2xl font-medium">Enter a new one</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setReciepientName(e.target.value)}
          placeholder="Name"
          className="w-full bg-gray-100 p-3 rounded-lg"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setReciepientEmail(e.target.value)}
          placeholder="Email"
          className="w-full bg-gray-100 p-3 rounded-lg"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setReciepientPhone(e.target.value)}
          placeholder="Phone no."
          className="w-full bg-gray-100 p-3 rounded-lg"
        />
        <input
          type="text"
          value={adres}
          onChange={(e) => setAdres(e.target.value)}
          placeholder="Address"
          className="w-full bg-gray-100 p-3 rounded-lg"
        />
        <input
          type="text"
          value={landmark}
          onChange={(e) => setLandmark(e.target.value)}
          placeholder="Landmark"
          className="w-full bg-gray-100 p-3 rounded-lg"
        />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          className="w-full bg-gray-100 p-3 rounded-lg"
        />
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="State"
          className="w-full bg-gray-100 p-3 rounded-lg"
        />
        <input
          type="text"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Pin code"
          className="w-full bg-gray-100 p-3 rounded-lg"
        />
        <button
          className="w-full bg-black text-white p-3 text-xl mt-4 rounded-2xl"
          onClick={saveAddress}
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default Page;
