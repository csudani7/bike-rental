//#Global Imports
import React from "react";
import {
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/outline";

//#Local Imports
import Modal from "../../Components/Modal";
import BikeManageFormContainer from "./BikeManageFormContainer";
import { bikeManageData } from "../../utils";

const BikeMange = () => {
  const [bikeData, setBikeData] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState("");
  const [selectedUser, setSelectedUser] = React.useState({});

  const handleEditEvent = (selectedID) => {
    const temData = bikeData.filter((data) => data.id === selectedID)[0];
    setSelectedUser(temData);
    setIsModalOpen("edit");
  };

  React.useEffect(() => {
    //Implementation of fetch API of User/Manager Data
    setBikeData(bikeManageData); //TODO: set the get data from response as per Role is Selected
  }, []);

  return (
    <div className="flex flex-col items-center w-full h-screen py-8">
      <div className="flex flex-col items-center justify-center w-2/3 gap-4">
        {/* Add and Toggle Button Section */}
        <div className="flex items-center justify-between w-full mb-12">
          <button
            type="button"
            className="flex items-center px-6 py-2 space-x-4 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => setIsModalOpen("add")}
          >
            <span>Add</span>
            <PlusCircleIcon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
        {/* Data Listing Section */}
        {bikeData.map((items) => (
          <div
            key={items.id}
            className="relative flex items-center justify-between w-full px-6 py-5 space-x-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          >
            <div className="flex items-center justify-between w-full gap-8">
              <div className="focus:outline-none">
                <p className="text-sm font-medium text-gray-900">
                  {items.modal}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div
                  className="cursor-pointer"
                  onClick={() => handleEditEvent(items.id)}
                >
                  <PencilIcon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="cursor-pointer cursor">
                  <TrashIcon className="w-5 h-5 cursor" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Add and Edit User/Manager Form Modal Section */}
      <Modal
        isModalOpen={isModalOpen === "edit" || isModalOpen === "add"}
        setIsModalOpen={() => setIsModalOpen("")}
        isConfirmation={false}
      >
        <BikeManageFormContainer />
      </Modal>
    </div>
  );
};

export default BikeMange;
