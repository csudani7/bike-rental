//#Global imports
import React from "react";

function CancleRideModal(props) {
  const { selectedTrip, handleDeleteTrip } = props;

  return (
    <div className="m-4 text-lg font-bold">
      Are you sure to cancel the ride ? {selectedTrip.id}
      <div className="flex justify-between mt-4">
        <button
          onClick={handleDeleteTrip}
          type="submit"
          className="inline-flex items-center justify-center w-full px-6 py-3 mt-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm disabled:cursor-not-allowed disabled:bg-slate-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto"
        >
          Yes
        </button>
      </div>
    </div>
  );
}

export default CancleRideModal;
