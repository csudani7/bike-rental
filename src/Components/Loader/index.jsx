import React from "react";

export default function Loader() {
  return (
    <div class="flex justify-center items-center">
      <div
        class="bg-blue-80 spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
        role="status"
      >
        <span class="visually-hidde"></span>
      </div>
    </div>
  );
}
