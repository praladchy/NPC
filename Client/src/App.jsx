import './index.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-4xl font-bold text-blue-600">
          Nexora
        </h1>

        <p className="mt-4 text-gray-600">
          React + TypeScript + Vite + Tailwind CSS
        </p>

        <button className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;

