//#Global imports
import React from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

//#Local Imports
import {
  getErrorMessage,
  regexForEmailAddress,
  regexForName,
  regexForPassword,
} from "../../utils";
import db, { auth } from "../../firebse";

const FormContainer = (props) => {
  const { actionType, selectedUserData, setIsModalOpen, setSwitchValue } =
    props;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    if (actionType === "add") {
      auth
        .createUserWithEmailAndPassword(values.email, values.password)
        .then((response) => {
          db.collection("users")
            .add({
              fullName: values.fullName,
              uid: response.user.uid,
              email: response.user.email,
              role: values.role,
            })
            .then(() => {
              setIsModalOpen(false);
              setSwitchValue(values.role);
            })
            .catch((error) => {
              toast.error(error.data.message);
            });
        })
        .catch((error) => {
          toast.error(error.data.message);
        });
    } else if (actionType === "edit") {
      db.collection("users")
        .doc(values.id)
        .update({ fullName: values.fullName, role: values.role })
        .then(() => {
          setIsModalOpen(false);
          setSwitchValue(values.role);
        })
        .catch((error) => {
          toast.error(error.data.message);
        });
    }
  };

  return (
    <div className="w-full p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-8 m-auto mt-6"
      >
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-900"
          >
            Full name
          </label>
          <div className="mt-1">
            <input
              id="fullName"
              name="fullName"
              type="fullName"
              autoComplete="fullName"
              {...register("fullName", {
                required: true,
                pattern: regexForName,
              })}
              className={clsx(
                errors.fullName
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
                "block w-full px-4 py-3 text-gray-900 rounded-md shadow-sm "
              )}
            />
          </div>
          {errors.fullName && (
            <p className="text-sm font-semibold text-red-500">
              {getErrorMessage(errors, "fullName", "Full Name")}
            </p>
          )}
        </div>

        {actionType === "add" && (
          <>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  {...register("email", {
                    required: true,
                    pattern: regexForEmailAddress,
                  })}
                  className={clsx(
                    errors.email
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
                    "block w-full px-4 py-3 text-gray-900 rounded-md shadow-sm "
                  )}
                />
              </div>
              {errors.email && (
                <p className="text-sm font-semibold text-red-500">
                  {getErrorMessage(errors, "email", "Email Address")}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    pattern: regexForPassword,
                  })}
                  className={clsx(
                    errors.password
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
                    "block w-full px-4 py-3 text-gray-900 rounded-md shadow-sm "
                  )}
                />
              </div>
              {errors.password && (
                <p className="text-sm font-semibold text-red-500">
                  {getErrorMessage(errors, "password", "Password")}
                </p>
              )}
            </div>
          </>
        )}

        <div className="sm:col-span-2">
          <div className="flex justify-between">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-900"
            >
              Role
            </label>
          </div>
          <div className="mt-1">
            <div className="mt-1">
              <select
                id="role"
                name="role"
                className={clsx(
                  errors.role
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
                  "block w-full px-4 py-3 text-gray-900 rounded-md shadow-sm "
                )}
                {...register("role", {
                  required: true,
                })}
                defaultValue={actionType === "edit" && selectedUserData?.role}
              >
                <option>Select Role</option>
                <option>User</option>
                <option>Manager</option>
              </select>
            </div>
          </div>
          {errors.role && (
            <p className="text-sm font-semibold text-red-500">
              Select a Role is Required.
            </p>
          )}
        </div>

        <div className="sm:col-span-2 sm:flex sm:justify-end">
          <button
            type="submit"
            className="inline-flex items-center justify-center w-full px-6 py-3 mt-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormContainer;
