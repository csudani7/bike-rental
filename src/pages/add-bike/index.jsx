//#Global Imports
import React from "react";
import { StarIcon } from "@heroicons/react/solid";

//#Local Imports
import DropDown from "../../components/dropDown";

const colors = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
  { id: 7, name: "Caroline Schultz" },
  { id: 8, name: "Mason Heaney" },
  { id: 9, name: "Claudie Smitham" },
  { id: 10, name: "Emil Schaefer" },
];

const locations = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
  { id: 7, name: "Caroline Schultz" },
  { id: 8, name: "Mason Heaney" },
  { id: 9, name: "Claudie Smitham" },
  { id: 10, name: "Emil Schaefer" },
];

function CreateBike() {
  const [modal, setmodal] = React.useState();
  const [color, setColor] = React.useState(colors[0]);
  const [location, setLocation] = React.useState(locations[0]);
  // const [rating, setRating] = React.useState(); //TODO: Need to uncomment when its come to use

  return (
    <form>
      <div>
        <div>
          <label
            htmlFor="modal"
            className="block text-sm font-medium text-gray-700"
          >
            modal
          </label>
          <div className="mt-1">
            <input
              value={modal}
              onChange={(e) => {
                setmodal(e.target.value);
              }}
              type="modal"
              name="modal"
              id="modal"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <DropDown
            title={"color"}
            options={colors}
            setValue={setColor}
            value={color}
          ></DropDown>
        </div>
        <div>
          <label
            htmlFor="modal"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <DropDown
            title={"location"}
            options={locations}
            setValue={setLocation}
            value={location}
          ></DropDown>
        </div>
        <div>
          <label
            htmlFor="modal"
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

export default CreateBike;
