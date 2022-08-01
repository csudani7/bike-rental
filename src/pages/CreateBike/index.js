import React, { useState } from "react";

function CreateBike() {
  const [model, setModel] = useState();
  const [color, setColor] = useState();
  const [location, setLocation] = useState();
  const [rating, setRating] = useState();
  return (
    <div>
      <div>
        <label
          htmlFor="model"
          className="block text-sm font-medium text-gray-700"
        >
          Model
        </label>
        <div className="mt-1">
          <input
            value={model}
            onChange={(e) => {
              setModel(e.target.value);
            }}
            type="model"
            name="model"
            id="model"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="model"
          className="block text-sm font-medium text-gray-700"
        >
          Color
        </label>
        <div className="mt-1">
          <input
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
            }}
            type="model"
            name="model"
            id="model"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="model"
          className="block text-sm font-medium text-gray-700"
        >
          Location
        </label>
        <div className="mt-1">
          <input
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            type="model"
            name="model"
            id="model"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="model"
          className="block text-sm font-medium text-gray-700"
        >
          Rating
        </label>
        <div className="mt-1">
          <input
            value={rating}
            onChange={(e) => {
              setRating(e.target.value);
            }}
            type="model"
            name="model"
            id="model"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="you@example.com"
          />
        </div>
      </div>
    </div>
  );
}

export default CreateBike;
