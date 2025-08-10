// src/components/Input.jsx

const Input = ({
  type = "text",
  value,
  onChange,
  placeholder = "",
  disabled = false,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full p-3 rounded-lg border border-[#C8A2C8] bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-[#C8A2C8] transition ${
        disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
      }`}
    />
  );
};

export default Input;
