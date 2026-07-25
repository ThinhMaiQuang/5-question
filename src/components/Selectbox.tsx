import { CommonOption } from "../model/common.model";

interface SelectboxProps {
  id: string;
  initOption: string;
  options: CommonOption[];
  onChangeOption: (selectedValue: string) => void;
}

const Selectbox: React.FC<SelectboxProps> = ({
  id,
  initOption,
  options,
  onChangeOption,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeOption(event.target.value);
  };
  return (
    <div className="max-w-sm pr-6">
      <select
        id={id}
        defaultValue={undefined}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value={undefined}>{initOption}</option>
        {options.map((option: CommonOption, idx: number) => {
          return (
            <option value={option.value} key={idx}>
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Selectbox;
