import React from "react";
import { SelectedValue } from "../model/common.model";

export type OptionStatus = "normal" | "correct" | "incorrect";

interface OptionProps {
  label: string;
  id: number;
  onlyView: boolean;
  status: OptionStatus;
  onSelect: (selectedValue: SelectedValue) => void;
}

const Option: React.FC<OptionProps> = ({
  label,
  id,
  onlyView,
  status,
  onSelect,
}) => {
  const buttonClass: Record<OptionStatus, string> = {
    normal:
      "text-green-500 border border-green-500 rounded px-4 py-1 hover:bg-gray-100",
    correct:
      "text-white bg-green-500 border border-green-500 rounded px-4 py-1 hover:bg-green-600",
    incorrect:
      "text-white bg-red-500 border border-red-500 rounded px-4 py-1 hover:bg-red-600",
  };

  const select = () => {
    onSelect({ label, id });
  };

  return (
    <div
      className={`${buttonClass[status]} cursor-pointer text-center`}
      onClick={select}
    >
      {label}
    </div>
  );
};

export default Option;
