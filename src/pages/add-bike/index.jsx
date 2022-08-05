//#Global Imports
import React from "react";
import { StarIcon } from "@heroicons/react/solid";

//#Local Imports
import DropDown from "../../components/dropDown";
import { BIKE_COLORS, LOCATIONS } from "../../utils";

function AddBike() {
  const [modalName, setBikemodal] = React.useState("");
  const [bikeColor, setBikeColor] = React.useState(BIKE_COLORS[0]);
  const [bikeLocation, setBikeLocation] = React.useState(LOCATIONS[0]);
  // const [rating, setRating] = React.useState(); //TODO: Need to uncomment when its come to use

  return (
    <form>
      <div>
        <div>
          <label
            htmlFor="modalName"
            className="block text-sm font-medium text-gray-700"
          >
            Modal Name
          </label>
          <div className="mt-1">
            <input
              value={modalName}
              onChange={(e) => {
                setBikemodal(e.target.value);
              }}
              type="modalName"
              name="modalName"
              id="modalName"
              placeholder="eg. Ducati"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <DropDown
            title="Color"
            options={BIKE_COLORS}
            setDropDownValue={setBikeColor}
            dropDownValue={bikeColor}
          />
        </div>
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <DropDown
            title="Location"
            options={LOCATIONS}
            setDropDownValue={setBikeLocation}
            dropDownValue={bikeLocation}
          />
        </div>
        <div>
          <label
            htmlFor="bike-rating"
            className="block text-sm font-medium text-gray-700"
          >
            Rating
          </label>
          <div className="mt-1">
            <StarIcon className="w-5 h-5" />
            <StarIcon className="w-5 h-5" />
            <StarIcon className="w-5 h-5" />
            <StarIcon className="w-5 h-5" />
            <StarIcon className="w-5 h-5" />
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddBike;
