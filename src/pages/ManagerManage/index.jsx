//#Global Imports
import React from "react";
import { useForm } from "react-hook-form";
//#Local Imports

const ManagerManage = () => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div className="flex items-center justify-center w-screen h-screen text-4xl font-bold text-red-800">
      Welcome to Manage Page
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Contact information */}
        <div className="relative overflow-hidden py-10 px-6 bg-indigo-700 sm:px-10 xl:p-12">
          <div
            className="hidden absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none sm:block lg:hidden"
            aria-hidden="true"
          >
            <svg
              className="absolute inset-0 w-full h-full"
              width={359}
              height={339}
              viewBox="0 0 359 339"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z"
                fill="url(#linear2)"
                fillOpacity=".1"
              />
              <defs>
                <linearGradient
                  id="linear2"
                  x1="192.553"
                  y1="28.553"
                  x2="899.66"
                  y2="735.66"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#fff" />
                  <stop offset={1} stopColor="#fff" stopOpacity={0} />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div
            className="hidden absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none lg:block"
            aria-hidden="true"
          >
            <svg
              className="absolute inset-0 w-full h-full"
              width={160}
              height={678}
              viewBox="0 0 160 678"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-161 679.107L546.107-28l707.103 707.107-707.103 707.103L-161 679.107z"
                fill="url(#linear3)"
                fillOpacity=".1"
              />
              <defs>
                <linearGradient
                  id="linear3"
                  x1="192.553"
                  y1="325.553"
                  x2="899.66"
                  y2="1032.66"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#fff" />
                  <stop offset={1} stopColor="#fff" stopOpacity={0} />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Contact form */}
        <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
          <h3 className="text-lg font-medium text-gray-900">
            Send us a message
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
          >
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-900"
              >
                First name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-900"
              >
                Last name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                />
              </div>
            </div>
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
                  className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-900"
                >
                  Phone
                </label>
                <span id="phone-optional" className="text-sm text-gray-500">
                  Optional
                </span>
              </div>
              <div className="mt-1">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  autoComplete="tel"
                  className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  aria-describedby="phone-optional"
                />
              </div>
            </div>

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
                <select
                  id="role"
                  name="role"
                  className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                >
                  <option>User</option>
                  <option>Manager</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-2 sm:flex sm:justify-end">
              <button
                type="submit"
                className="mt-2 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManagerManage;
