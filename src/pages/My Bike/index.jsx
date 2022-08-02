//#Global Imports
import React from "react";

//#Local Imports
import { myBikeData } from "../../utils";
const MyBike = () => {
  return (
    <>
    {myBikeData .map((item,i)=>{
      return <div className="gap-4 flex items-center mt-2 flex-col w-2/3" key={i}>
        <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center justify-between space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 w-full">
          <div className="flex items-center justify-between gap-8 w-full">
            <div className="flex items-center justify-between gap-44">
              <div className="focus:outline-none justify-start">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">
                  <span>
                    <strong>Modal: </strong>
                  </span>
                  {item.Modal}
                </p>
                <p className="text-sm font-medium text-gray-900 mt-6">
                  <span>
                    <strong>Color: </strong>
                  </span>
                  {item.Color}
                </p>
              </div>

              <div className="focus:outline-none justify-end">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">
                  <span>
                    <strong>Location: </strong>
                  </span>
                  {item.Location}
                </p>
                <p className="text-sm font-medium text-gray-900  mt-6">
                  <span>
                    <strong>Rating: </strong>
                  </span>
                  {item.Rating}
                </p>
              </div>
              <div className="focus:outline-none justify-start">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">
                  <span>
                    <strong>Start Date: </strong>
                  </span>
                  {item.StartDate}
                </p>
                <p className="text-sm font-medium text-gray-900 mt-6">
                  <span>
                    <strong>End Date: </strong>
                  </span>
                  {item.EndDate}
                </p>
              </div>
            </div>

            <div className="focus:outline-none flex flex-col">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 mb-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Done
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    })}

    
    </>
  );
};

export default MyBike;
