export default function Sidebar({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) {
  return (
    <div
      className={`fixed top-0 left-0 border-r h-full bg-white shadow-md z-50 transform md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 w-64`}
    >
      <div className="md:hidden p-2">
        <button onClick={toggleSidebar} aria-label="Toggle Sidebar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold">GENPOS</h2>
      </div>
      <ul className="p-4">
        <li className="py-2">
          <a href="#dashboard" className="hover:text-blue-500">
            Dashboard
          </a>
        </li>
        <li className="py-2">
          <a href="#purchase" className="hover:text-blue-500">
            Purchase
          </a>
        </li>
        <li className="py-2">
          <a href="#business-unit" className="hover:text-blue-500">
            Business Unit
          </a>
        </li>
        <li className="py-2">
          <a href="#catalog" className="hover:text-blue-500">
            Catalog
          </a>
        </li>
      </ul>
    </div>
  );
}
