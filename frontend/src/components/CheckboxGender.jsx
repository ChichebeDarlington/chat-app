import React from "react";

const CheckboxGender = ({ onCheckboxChange, selectedGenger }) => {
  return (
    <div className="flex">
      <div className="form-control flex flex-col justify-center">
        <label
          htmlFor=""
          className={`labe gap-2 cursor-pointer ${
            selectedGenger === "male" ? "selected" : ""
          }`}
        >
          <span className="label-text text-white inline-block">Male</span>
          <input
            type="checkbox"
            className="checkbox checkbox-accent border-white-900"
            checked={selectedGenger === "male"}
            onChange={() => onCheckboxChange("male")}
          />
        </label>
      </div>
      <div className="form-control">
        <label
          htmlFor=""
          className={`labe gap-2 cursor-pointer ${
            selectedGenger === "female" ? "selected" : ""
          }`}
        >
          <span className="label-text text-white">Female</span>
          <input
            type="checkbox"
            className="checkbox checkbox-accent border-white-900"
            checked={selectedGenger === "female"}
            onChange={() => onCheckboxChange("female")}
          />
        </label>
      </div>
    </div>
  );
};

export default CheckboxGender;
