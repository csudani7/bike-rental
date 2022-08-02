//#Global Imports
import React from "react";
import clsx from "clsx";
import {
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/outline";

//#Local Imports
import { userData, managerData } from "../../utils";
import Modal from "../../Components/Modal";
import FormContainer from "./FormContainer";

const ManagerManage = () => {
  const [data, setData] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [toggleButtonValue, setToggleButtonValue] = React.useState("User");
  const [selectedUser, setSelectedUser] = React.useState({});

  const handleEditEvent = (selectedID) => {
    const temData = data.filter((data) => data.id === selectedID)[0];
    setSelectedUser(temData);
    setIsModalOpen(true);
  };

  React.useEffect(() => {
    const tempData = toggleButtonValue === "User" ? userData : managerData;
    //Implementation of fetch API of User/Manager Data
    setData(tempData); //TODO: set the get data from response as per Role is Selected
  }, [toggleButtonValue]);

  return (
    <div className="flex flex-col items-center w-full h-screen py-8">
      <div className="flex flex-col items-center justify-center w-2/3 gap-4">
        {/* Add and Toggle Button Section */}
        <div className="flex items-center justify-between w-full mb-12">
          <button
            type="button"
            className="flex items-center px-6 py-2 space-x-4 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => setIsModalOpen(true)}
          >
            <span>Add</span>
            <PlusCircleIcon className="w-6 h-6" aria-hidden="true" />
          </button>
          {/* Toggle Button */}
          <div
            className={clsx(
              "relative flex items-center justify-between border rounded-2xl border-blue-600 overflow-hidden w-auto bg-gray-50"
            )}
          >
            {toggleButtonValue === "Manager" ? (
              <button
                type="button"
                className="flex items-center justify-center w-20 p-2 text-base font-medium text-white bg-indigo-600 border border-transparent shadow-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Manager
              </button>
            ) : (
              <div
                className="w-20 p-2 text-base font-medium cursor-pointer"
                onClick={() => {
                  setToggleButtonValue("Manager");
                }}
              >
                Manager
              </div>
            )}
            {toggleButtonValue === "User" ? (
              <button
                type="button"
                className="flex items-center justify-center w-20 p-2 text-base font-medium text-white bg-indigo-600 border border-transparent shadow-sm rounded-2xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                User
              </button>
            ) : (
              <div
                className="flex justify-center w-20 p-2 text-base font-medium cursor-pointer"
                onClick={() => {
                  setToggleButtonValue("User");
                }}
              >
                User
              </div>
            )}
          </div>
        </div>
        {/* Data Listing Section */}
        {data.map((user) => (
          <div
            key={user.id}
            className="relative flex items-center justify-between w-full px-6 py-5 space-x-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          >
            <div className="flex items-center justify-between w-full gap-8">
              <div className="focus:outline-none">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
              </div>
              <div className="flex items-center gap-4">
                <div
                  className="cursor-pointer"
                  onClick={() => handleEditEvent(user.id)}
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
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isConfirmation={false}
      >
        <FormContainer />
      </Modal>
    </div>
  );
};

export default ManagerManage;
