//#Global Imports
import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";

function UserCard(props) {
  const {
    userData,
    setUserHistoryModalOpen,
    setSelectedUserData,
    handleUserHistory,
    handleEditAction,
  } = props;

  return (
    <>
      <div
        key={userData.id}
        className="w-full bg-white border shadow-sm cursor-pointer"
      >
        <div className="max-w-md mx-auto overflow-hidden">
          <div className="relative">
            <div
              className="py-4 text-center hover:bg-indigo-50"
              onClick={() => {
                handleUserHistory(userData);
                setUserHistoryModalOpen(true);
                setSelectedUserData(userData);
              }}
            >
              <div className="flex items-center justify-around">
                <h4 className="text-xl font-bold tracking-tight text-gray-900">
                  {userData.fullName}
                </h4>
                <p className="flex items-center">
                  <span className="ml-2 text-sm font-bold text-gray-400 capitalize">
                    Role: {userData?.role}
                  </span>
                </p>
              </div>
              <span className="ml-2 text-sm font-bold text-gray-400">
                {userData?.email}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center text-center">
            <button
              type="button"
              className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-700 border border-transparent shadow-sm hover:bg-indigo-800 focus:outline-none sm:w-auto sm:text-sm"
              onClick={() => {
                handleEditAction(userData);
              }}
            >
              <PencilIcon className="w-5 h-5" aria-hidden="true" />
              <span className="ml-2">Edit</span>
            </button>
            <button
              type="button"
              className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent shadow-sm hover:bg-red-700 sm:w-auto sm:text-sm"
            >
              <TrashIcon className="w-5 h-5 cursor" aria-hidden="true" />
              <span className="ml-2">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserCard;
