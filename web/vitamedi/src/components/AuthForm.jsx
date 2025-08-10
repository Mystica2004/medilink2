// src/components/AuthForm.jsx
const AuthForm = ({ title, children, onSubmit, buttonText, bottomText, bottomLink, bottomLinkText }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <form
        onSubmit={onSubmit}
        className="bg-white p-8 rounded-lg shadow-xl w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">{title}</h2>
        {children}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {buttonText}
        </button>
        {bottomText && (
          <p className="text-sm text-center mt-2">
            {bottomText}{" "}
            <a href={bottomLink} className="text-blue-600 hover:underline">
              {bottomLinkText}
            </a>
          </p>
        )}
      </form>
    </div>
  );
};

export default AuthForm;
