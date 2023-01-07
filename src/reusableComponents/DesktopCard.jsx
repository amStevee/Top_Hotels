import React from "react";

export default function DesktopCard({ item }) {
  return (
    <div className="flex justify-center items-center">
      <div className="shadow-xl dark:shadow-xl w-full m-2 h-64 flex dark:bg-offwhite dark:text-black">
        <div className="flex overflow-auto snap-mandatory snap-x w-64 ">
          <div className="shrink-0">
            <img
              src={item?.photo?.images?.original}
              alt={item?.photo?.caption}
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
        <div className="p-2">
          <h1 className="text-icon text-lg font-roboto_black">{item?.name}</h1>
          <p className="mb-1">
            <span className="text-green-700">{item?.ranking}</span>
          </p>
          <p className="mb-1 text-gray-600 font-Livvic_light">{item.ranking}</p>
          <p className="font-Livvic">
            Address: <br /> Address: <br /> {item.location_string}
          </p>
          <p className="mb-1">
            Price: <span className="text-green-700">{item?.price}</span>
          </p>
          <div className="flex">
            <span className="text-green mr-6">Rating: {item?.rating}</span>{" "}
            <span
              className={item.is_closed ? "text-red-700" : "text-green-700"}
            >
              {item.is_closed ? "Closed" : "Open"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
