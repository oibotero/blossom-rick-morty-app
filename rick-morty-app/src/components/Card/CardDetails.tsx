import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CardDetails = () => {
  const { id } = useParams();
  const [fetchedData, updateFetchedData] = useState({});
  const { name, location, origin, gender, image, status, species } = fetchedData;

  const api = `https://rickandmortyapi.com/api/character/${id}`;

  useEffect(() => {
    (async function () {
      const data = await fetch(api).then((res) => res.json());
      updateFetchedData(data);
    })();
  }, [api]);

  let statusColor =
    status === "Dead"
      ? "bg-red-600"
      : status === "Alive"
      ? "bg-green-600"
      : "bg-gray-500";

  return (
    <div className="container mx-auto flex justify-center mb-10 px-4">
      <div className="flex flex-col items-center gap-6 max-w-md text-center">
        <h1 className="text-3xl font-bold">{name}</h1>
        <img className="w-full h-auto rounded-xl shadow" src={image} alt={name} />
        <div
          className={`px-4 py-2 text-white text-base font-semibold rounded-xl ${statusColor}`}
        >
          {status}
        </div>
        <div className="text-left w-full space-y-2">
          <div>
            <span className="font-semibold">Gender:</span> {gender}
          </div>
          <div>
            <span className="font-semibold">Location:</span> {location?.name}
          </div>
          <div>
            <span className="font-semibold">Origin:</span> {origin?.name}
          </div>
          <div>
            <span className="font-semibold">Species:</span> {species}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
