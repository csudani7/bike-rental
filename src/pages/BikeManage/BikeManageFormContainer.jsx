//#Global imports
import React from "react";
import clsx from "clsx";
import { useForm, Controller } from "react-hook-form";

//#Local Imports
import { getErrorMessage, regexForName } from "../../utils";
import db, { auth } from "../../Firebase";

const BikeManageFormContainer = (props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const onSubmit = (data) => {
    console.log("00000000");
    if (props.mode === "add") {
      db.collection("bikes")
        .add({
          modalName: data.modalName,
          color: data.color,
          location: data.location,
          rating: 0,
        })
        .then((dd) => {
          console.log(dd);
          props.setIsModalOpen(null);
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (props.mode === "edit") {
      db.collection("bikes")
        .doc(props.data.id)
        .update({
          modalName: data.modalName,
          color: data.color,
          location: data.location,
        })
        .then((p) => {
          props.setIsModalOpen(null);
        });
    }
    console.log(data);
  };
  const handleDeleteBike = () => {
    db.collection("bikes")
      .doc(props.data.id)
      .delete()
      .then((p) => {
        props.setIsModalOpen(null);
      });
  };
  return (
    <div className="w-full px-6 py-10 sm:px-10 xl:p-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-8 m-auto mt-6"
      >
        <div>
          <label
            htmlFor="modalName"
            className="block text-sm font-medium text-gray-900"
          >
            Modal Name
          </label>
          <Controller
            control={control}
            name="modalName"
            defaultValue={props.mode === "edit" ? props.data.modalName : ""}
            rules={{ required: true, pattern: regexForName }}
            render={({ field: { name, value, onChange } }) => {
              return (
                <div className="mt-1">
                  <input
                    type="text"
                    name={name}
                    id={name}
                    value={value}
                    autoComplete="off"
                    className={clsx(
                      errors.modalName
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
                      "block w-full px-4 py-3 text-gray-900 rounded-md shadow-sm "
                    )}
                    onChange={(v) => onChange(v)}
                  />
                </div>
              );
            }}
          />
          <p className="text-sm font-semibold text-red-500">
            {getErrorMessage(errors, "modalName", "Modal Name")}
          </p>
        </div>

        <div>
          <label
            htmlFor="color"
            className="block text-sm font-medium text-gray-900"
          >
            Color
          </label>
          <Controller
            control={control}
            name="color"
            defaultValue={props.mode === "edit" ? props.data.color : ""}
            rules={{ required: true }}
            render={({ field: { name, value, onChange } }) => {
              return (
                <div className="mt-1">
                  <div className="mt-1">
                    <select
                      id={name}
                      name={name}
                      className={clsx(
                        errors.color
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
                        "block w-full px-4 py-3 text-gray-900 rounded-md shadow-sm "
                      )}
                      value={value ?? ""}
                      onChange={(v) => onChange(v)}
                    >
                      <option></option>
                      <option>Black</option>
                      <option>Blue</option>
                      <option>Red</option>
                      <option>Gray</option>
                      <option>Orange</option>
                      <option>Yellow</option>
                    </select>
                  </div>
                </div>
              );
            }}
          />
          {errors.color && (
            <p className="text-sm font-semibold text-red-500">
              Select a Color is Required.
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-900"
          >
            Location
          </label>
          <Controller
            control={control}
            name="location"
            defaultValue={props.mode === "edit" ? props.data.location : ""}
            rules={{ required: true }}
            render={({ field: { name, value, onChange } }) => {
              return (
                <div className="mt-1">
                  <div className="mt-1">
                    <select
                      id={name}
                      name={name}
                      className={clsx(
                        errors.location
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
                        "block w-full px-4 py-3 text-gray-900 rounded-md shadow-sm "
                      )}
                      value={value ?? ""}
                      onChange={(v) => onChange(v)}
                    >
                      <option></option>
                      <option>Suart</option>
                      <option>Baroda</option>
                      <option>Gandhinagar</option>
                      <option>Ahemdabad</option>
                    </select>
                  </div>
                </div>
              );
            }}
          />
          {errors.location && (
            <p className="text-sm font-semibold text-red-500">
              Select a Location is Required.
            </p>
          )}
        </div>
        <div className="sm:col-span-2 sm:flex space-x-3 sm:justify-end">
          <button
            type="submit"
            className="inline-flex items-center justify-center w-full px-6 py-3 mt-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto"
          >
            Submit
          </button>

          {props.mode === "edit" && (
            <button
              type="button"
              onClick={handleDeleteBike}
              className="inline-flex items-center justify-center w-full px-6 py-3 mt-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BikeManageFormContainer;
