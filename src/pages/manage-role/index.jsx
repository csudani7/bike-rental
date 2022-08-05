//#Global Imports
import React from "react";
import clsx from "clsx";
import {
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/outline";

//#Local Imports
import Modal from "../../components/modal";
import FormContainer from "./FormContainer";
import db from "../../firebse";
import HistoryModal from "./HistoryModal";
import Temp from "../../Components/Temp";

const ManagerManage = () => {
  const [data, setData] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isUserHistoryModal, setIsUserHistoryModal] = React.useState(false);
  const [mode, setMode] = React.useState("add");
  const [toggleButtonValue, setToggleButtonValue] = React.useState("User");
  const [selectedUser, setSelectedUser] = React.useState({});
  const [selectedUserForHistory, setSelectedUserForHistory] = React.useState(
    {}
  );

  const handleEditEvent = (user) => {
    setMode("edit");
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  const showHistory = (user) => {
    setSelectedUserForHistory(user);
    setIsUserHistoryModal(true);
  };
  const handleAddUser = () => {
    setMode("add");
    setIsModalOpen(true);
  };
  React.useEffect(() => {
    setData([]);
    db.collection("users")
      .where("role", "==", toggleButtonValue)
      .onSnapshot((snapshot) => {
        setData(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
  }, [toggleButtonValue]);

  return (
    <div className="flex flex-col items-center w-full py-8">
      <div className="flex flex-col items-center justify-center w-2/3 gap-4">
        {/* Add and Toggle Button Section */}
        <div className="flex items-center justify-between w-full mb-12">
          <button
            type="button"
            className="flex items-center px-6 py-2 space-x-4 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleAddUser}
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

        {/* Card Listing UI from Temp.js*/}
        <Temp />

        {/* Data Listing Section */}
        {data.map((user, index) => (
          <div
            key={index}
            className="relative flex items-center justify-between w-full px-6 py-5 space-x-3 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            onClick={() => {
              setIsUserHistoryModal(true);
              setSelectedUser(user);
            }}
          >
            <div
              onClick={() => {
                showHistory(user);
              }}
              className="flex items-center justify-between w-full gap-8"
            >
              <div className="focus:outline-none">
                <p className="text-sm font-medium text-gray-900">
                  {user.fullName}
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {user.email}
                </p>
                <p className="text-sm font-medium text-gray-900">
                  Role : {user.role}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div
                  className="cursor-pointer"
                  onClick={() => handleEditEvent(user)}
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
        <FormContainer
          setIsModalOpen={setIsModalOpen}
          data={selectedUser}
          mode={mode}
          setToggleButtonValue={setToggleButtonValue}
        />
      </Modal>

      {/* User/Manager Bike Reserved History Modal Section */}
      <Modal
        isModalOpen={isUserHistoryModal}
        setIsModalOpen={setIsUserHistoryModal}
        isConfirmation={false}
      >
        <HistoryModal user={selectedUserForHistory} />
      </Modal>
    </div>
  );
};

export default ManagerManage;
