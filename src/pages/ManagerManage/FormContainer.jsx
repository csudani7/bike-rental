//#Global imports
import React from "react";
import clsx from "clsx";
import { useForm, Controller, set } from "react-hook-form";

//#Local Imports
import {
  getErrorMessage,
  regexForEmailAddress,
  regexForName,
  regexForPassword,
} from "../../utils";
import db, { auth } from "../../Firebase";

const FormContainer = (props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const onSubmit = (data) => {
    if (props.mode === "add") {
      auth
        .createUserWithEmailAndPassword(data.email, data.password)
        .then((d) => {
          db.collection("users")
            .add({
              fullName: data.fullName,
              uid: d.user.uid,
              email: d.user.email,
              role: data.role,
            })
            .then((dd) => {
              console.log(dd);
              props.setIsModalOpen(false);
              props.setToggleButtonValue(data.role);
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (props.mode === "edit") {
      db.collection("users")
        .doc(props.data.id)
        .update({ fullName: data.fullName, role: data.role })
        .then((p) => {
          props.setIsModalOpen(false);
          props.setToggleButtonValue(data.role);
        });
    }
  };

  return (
    <div className="w-full px-6 py-10 sm:px-10 xl:p-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-8 m-auto mt-6"
      >
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-900"
          >
            Full name
          </label>
          <Controller
            control={control}
            defaultValue={props.mode === "edit" ? props.data?.fullName : ""}
            name="fullName"
            rules={{ required: true, pattern: regexForName }}
            render={({ field: { name, value, onChange } }) => {
              return (
                <div className="mt-1">
                  <input
                    type="text"
                    name={name}
                    id={name}
                    value={value}
                    className={clsx(
                      errors.fullName
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
            {getErrorMessage(errors, "fullName", "Full Name")}
          </p>
        </div>

        {props.mode === "add" && (
          <>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <Controller
                control={control}
                name="email"
                rules={{ required: true, pattern: regexForEmailAddress }}
                render={({ field: { name, value, onChange } }) => {
                  return (
                    <div className="mt-1">
                      <input
                        type="email"
                        name={name}
                        id={name}
                        value={value}
                        className={clsx(
                          errors.email
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
                {getErrorMessage(errors, "email", "Email")}
              </p>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <Controller
                control={control}
                name="password"
                rules={{ required: true, pattern: regexForPassword }}
                render={({ field: { name, value, onChange } }) => {
                  return (
                    <div className="mt-1">
                      <input
                        type="password"
                        name={name}
                        id={name}
                        value={value}
                        className={clsx(
                          errors.password
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
                {getErrorMessage(errors, "password", "Password")}
              </p>
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
          <Controller
            control={control}
            name="role"
            defaultValue={props.mode === "edit" && props.data?.role}
            rules={{ required: true }}
            render={({ field: { name, value, onChange } }) => {
              return (
                <div className="mt-1">
                  <div className="mt-1">
                    <select
                      id={name}
                      name={name}
                      className={clsx(
                        errors.role
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
                        "block w-full px-4 py-3 text-gray-900 rounded-md shadow-sm "
                      )}
                      value={value || null}
                      onChange={(v) => onChange(v)}
                    >
                      <option>User</option>
                      <option>Manager</option>
                    </select>
                  </div>
                </div>
              );
            }}
          />
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
