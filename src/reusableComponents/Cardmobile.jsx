import React from "react";

export default function Card({ item }) {
  return (
    <>
      {item.name && (
        <div className="shadow-xl dark:shadow-xl m-2 h-50 flex dark:bg-offwhite dark:text-black">
          <div className="flex overflow-auto snap-mandatory snap-x w-36">
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
            <h1 className="text-icon text-sm font-roboto_black bg-black bg-opacity-5">
              {item?.name}
            </h1>
            <p className="mb-1 text-xs">
              <span className="text-green-700">{item?.ranking}</span>
            </p>
            <p className="font-Livvic text-xs">
              Address: <br /> {item.location_string}
            </p>
            <p className="mb-1 text-xs">
              Price: <span className="text-green-700">{item?.price}</span>
            </p>
            <div className="flex justify-between">
              <span className="text-green text-xs">Rating: {item?.rating}</span>{" "}
              <span
                className={item.is_closed ? "text-red-700" : "text-green-700"}
              >
                {item.is_closed ? "Closed" : "Open"}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
