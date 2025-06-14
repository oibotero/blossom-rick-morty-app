import React from "react";
import { Link } from "react-router-dom";

const Card = ({ page, results }) => {
  if (!results) return <>No Characters Found :/</>;

  return results.map(({ id, image, name, status, location }) => {
    let statusColor =
      status === "Dead"
        ? "bg-red-600"
        : status === "Alive"
        ? "bg-green-600"
        : "bg-gray-500";

    return (
      <Link
        key={id}
        to={`${page}${id}`}
        className="relative text-black no-underline w-full sm:w-1/2 lg:w-1/3 p-2"
      >
        <div className="border-2 border-blue-600 rounded-xl flex flex-col justify-center overflow-hidden shadow hover:shadow-lg transition duration-200">
          <img src={image} alt={name} className="w-full h-auto rounded-t-xl" />
          <div className="p-4">
            <div className="text-lg font-bold mb-2">{name}</div>
            <div>
              <div className="text-sm text-gray-500">Last Location</div>
              <div className="text-base">{location.name}</div>
            </div>
          </div>
        </div>

        <div
          className={`absolute top-2 right-4 px-3 py-1 text-white text-sm font-semibold rounded-xl ${statusColor}`}
        >
          {status}
        </div>
      </Link>
    );
  });
};

export default Card;
