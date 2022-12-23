import React from "react";

export default function DesktopCard({ item }) {
  console.log(item);
  return (
    <div className="flex justify-center items-center">
      <div className="shadow-xl dark:shadow-xl w-full m-2 h-64 flex dark:bg-offwhite dark:text-black">
        <div className="flex overflow-auto snap-mandatory snap-x w-64 ">
          <div className="shrink-0">
            <img
              src={item?.photo?.images.medium.url}
              alt={item?.photo?.caption}
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
        <div className="p-2">
          <h1 className="text-icon text-lg font-roboto_black">{item?.name}</h1>
          <span className="text-xs mb-2 text-gray-500">
            City: {item?.location_string}
          </span>
          <p className="mb-1 text-green-500 font-Livvic_light text-xs">
            Rating: {item?.rating}
          </p>
          <p className="mb-1 text-gray-500 font-Livvic_light">{item.ranking}</p>
          <p className="font-Livvic">
            Address: <br /> {item.neighborhood_info[0]},{" "}
            {item.neighborhood_info[1]}
          </p>
          <p className="mb-1 text-green-500 font-Livvic_light text-sm">
            Price: {item?.price}
          </p>
          {item?.isOpen ? (
            <span className="text-green">Currently Close</span>
          ) : (
            <span className="text-red">Currently Open</span>
          )}
        </div>
      </div>
    </div>
  );
}
