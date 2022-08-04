import React, { useState } from "react";
import Modal from "../../Components/Modal";
import BookModal from "./BookModal";

function Bike(props) {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  return (
    <div
      key={props.data.id}
      className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center justify-between space-x-3 hover:border-indigo-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 w-full cursor-pointer"
    >
      <div className="flex items-center justify-between gap-8 w-full">
        <div className="flex items-center gap-8 md:gap-20">
          <div className="focus:outline-none justify-start">
            <p className="text-sm font-medium text-gray-900">
              <span>
                <strong>Modal: </strong>
              </span>
              {props.data.modalName}
            </p>
            <p className="text-sm font-medium text-gray-900 mt-2">
              <span>
                <strong>Color: </strong>
              </span>
              {props.data.color}
            </p>
          </div>

          <div className="focus:outline-none justify-end">
            <p className="text-sm font-medium text-gray-900">
              <span>
                <strong>Location: </strong>
              </span>{" "}
              {props.data.location}
            </p>
            <p className="text-sm font-medium text-gray-900 mt-2">
              <span>
                <strong>Rating: </strong>
              </span>{" "}
              {props.data.rating}
            </p>
          </div>
        </div>

        <div className="focus:outline-none flex items-center">
          <button
            type="button"
            onClick={() => {
              setIsBookModalOpen(true);
            }}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer"
          >
            Book
          </button>
        </div>
      </div>
      <Modal
        isModalOpen={isBookModalOpen}
        setIsModalOpen={() => setIsBookModalOpen(false)}
        isConfirmation={false}
      >
        <BookModal data={props.data} closeModal={setIsBookModalOpen} />
      </Modal>
    </div>
  );
}

export default Bike;
