//#Global Imports
import React from "react";
import { PlusCircleIcon } from "@heroicons/react/outline";

//#Local Imports
import db from "../../firebase";
import Modal from "../../components/modal";
import FormContainer from "./FormContainer";
import HistoryModal from "./HistoryModal";
import BikeCard from "./BikeCard";

const ManageBike = () => {
  const [bikeData, setBikeData] = React.useState([]);
  const [isFormActionType, setFormActionType] = React.useState(null);
  const [selectedBikeData, setSelectedBikeData] = React.useState({});
  const [isBikeHistoryModal, setIsBikeHistoryModal] = React.useState(false);
  const handleEditAction = (bikeData) => {
    setSelectedBikeData(bikeData);
    setFormActionType("edit");
  };

  const handleAddAction = () => {
    setFormActionType("add");
  };

  const handleBikeHistory = (bikeData) => {
    setSelectedBikeData(bikeData);
    setIsBikeHistoryModal(true);
  };

  React.useEffect(() => {
    db.collection("bikes").onSnapshot((snapshot) => {
      setBikeData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div className="flex flex-col items-center w-full h-screen py-8">
      <div className="flex flex-col items-center justify-center w-2/3 gap-4">
        {/* Add and Toggle Button Section */}
        <div className="flex items-center justify-between w-full mb-12">
          <button
            type="button"
            className="flex items-center px-6 py-2 space-x-4 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleAddAction}
          >
            <span>Add</span>
            <PlusCircleIcon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* Data Listing Section */}
        <div className="grid grid-cols-2 gap-12 -mx-px border-l border-gray-200 sm:mx-0 md:grid md:grid-cols-3 lg:grid lg:grid-cols-4">
          {bikeData.map((items, index) => (
            <BikeCard
              bikeData={items}
              handleEditAction={handleEditAction}
              handleBikeHistory={handleBikeHistory}
              setSelectedBikeData={setSelectedBikeData}
              setIsBikeHistoryModal={setIsBikeHistoryModal}
              key={index}
            />
          ))}
        </div>
      </div>

      {/* Add and Edit User/Manager Form Modal Section */}
      <Modal
        isModalOpen={isFormActionType === "edit" || isFormActionType === "add"}
        setIsModalOpen={() => setFormActionType("")}
        isConfirmation={false}
      >
        <FormContainer
          actionType={isFormActionType}
          setFormActionType={setFormActionType}
          formData={selectedBikeData}
        />
      </Modal>

      {/* Bike Used as a Ride by User History Modal Section */}
      <Modal
        isModalOpen={isBikeHistoryModal}
        setIsModalOpen={setIsBikeHistoryModal}
        isConfirmation={false}
      >
        <HistoryModal selectedBikeData={selectedBikeData} />
      </Modal>
    </div>
  );
};

export default ManageBike;
