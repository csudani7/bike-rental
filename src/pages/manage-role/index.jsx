//#Global Imports
import React from "react";
import clsx from "clsx";
import {
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/outline";

//#Local Imports
import db from "../../firebse";
import Modal from "../../components/modal";
import FormContainer from "./FormContainer";
import HistoryModal from "./HistoryModal";
import Temp from "../../components/Temp";

const ManageRole = () => {
  const [fetchedData, setFetchedData] = React.useState([]);
  const [actionType, setActionType] = React.useState("add");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [switchValue, setSwitchValue] = React.useState("user");
  const [selectedUserData, setSelectedUserData] = React.useState({});
  const [selectedUserHistory, setSelectedUserHistory] = React.useState({});
  const [isUserHistoryModalOpen, setUserHistoryModalOpen] =
    React.useState(false);

  const handleEditAction = (user) => {
    setActionType("edit");
    setSelectedUserData(user);
    setIsModalOpen(true);
  };

  const handleUserHistory = (user) => {
    setSelectedUserHistory(user);
    setUserHistoryModalOpen(true);
  };

  const handleAddUserAction = () => {
    setActionType("add");
    setIsModalOpen(true);
  };

  React.useEffect(() => {
    setFetchedData([]);
    db.collection("users")
      .where("role", "==", switchValue)
      .onSnapshot((snapshot) => {
        setFetchedData(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
  }, [switchValue]);

  return (
    <div className="flex flex-col items-center w-full py-8">
      <div className="flex flex-col items-center justify-center w-2/3 gap-4">
        {/* Add and Toggle Button Section */}
        <div className="flex items-center justify-between w-full mb-12">
          <button
            type="button"
            className="flex items-center px-6 py-2 space-x-4 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleAddUserAction}
          >
            <span>Add user</span>
            <PlusCircleIcon className="w-6 h-6" aria-hidden="true" />
          </button>
          {/* Toggle Button */}
          <div
            className={clsx(
              "relative flex items-center justify-between border rounded-2xl border-blue-600 overflow-hidden w-auto bg-gray-50"
            )}
          >
            {switchValue === "manager" ? (
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
                  setSwitchValue("manager");
                }}
              >
                Manager
              </div>
            )}
            {switchValue === "user" ? (
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
                  setSwitchValue("user");
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
        {fetchedData.map((user, index) => (
          <div
            key={index}
            className="relative flex items-center justify-between w-full px-6 py-5 space-x-3 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            onClick={() => {
              setUserHistoryModalOpen(true);
              setSelectedUserData(user);
            }}
          >
            <div
              onClick={() => {
                handleUserHistory(user);
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
                  onClick={() => handleEditAction(user)}
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
          actionType={actionType}
          selectedUserData={selectedUserData}
          setIsModalOpen={setIsModalOpen}
          setSwitchValue={setSwitchValue}
        />
      </Modal>

      {/* User/Manager Bike Reserved History Modal Section */}
      <Modal
        isModalOpen={isUserHistoryModalOpen}
        setIsModalOpen={setUserHistoryModalOpen}
        isConfirmation={false}
      >
        <HistoryModal selectedUserHistory={selectedUserHistory} />
      </Modal>
    </div>
  );
};

export default ManageRole;
