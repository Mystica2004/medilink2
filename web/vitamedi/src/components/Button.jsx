// src/components/Button.jsx

const Button = ({ children, onClick, type = "button", disabled = false }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`w-full bg-[#C8A2C8] hover:bg-[#b088b0] text-white font-semibold py-2 rounded-lg transition ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
