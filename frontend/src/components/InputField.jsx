import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const InputField = ({
  type,
  fieldName,
  placeholder,
  label,
  icon: Icon,
  value,
  onChange,
  showPassword,
  setShowPassword,
}) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={fieldName}
        className="flex select-none items-center justify-between px-1 py-2 text-base text-gray-700"
      >
        {label}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
          <Icon className="size-5" />
        </div>
        <input
          type={type}
          id={fieldName}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="focus:ring-primary-600 focus:border-primary-600 h-12 w-full flex-shrink rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 pl-10 text-sm text-gray-900"
          autoCapitalize={fieldName === "email" ? "none" : undefined}
        />
        {(label === "Password" || label === "Confirm Password") && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center p-3 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <AiOutlineEye className="size-5" />
            ) : (
              <AiOutlineEyeInvisible className="size-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
