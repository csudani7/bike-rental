import React from "react";

function CancleRideModal({ trip, onConfirm }) {
  return (
    <div className="m-4 text-lg font-bold">
      Are you sure to cancel the ride ?
      {trip.id}
      <div className="mt-4 flex justify-between">
        <button
          onClick={onConfirm}
          type="submit"
          className=" disabled:cursor-not-allowed disabled:bg-slate-400 inline-flex items-center justify-center w-full px-6 py-3 mt-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto"
        >
          Yes
        </button>
      </div>
    </div>
  );
}

export default CancleRideModal;
