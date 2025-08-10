// src/components/RoleSelect.jsx
const RoleSelect = ({ value, onChange }) => {
  return (
    <select
      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={value}
      onChange={onChange}
    >
      <option value="patient">Patient</option>
      <option value="doctor">Doctor</option>
    </select>
  );
};

export default RoleSelect;
