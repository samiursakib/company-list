export default function Main({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <div className="flex-1 md:ml-64 p-4">
      <div className="md:hidden">
        <button onClick={toggleSidebar} aria-label="Open Sidebar">
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
      <div>
        <h1 className="text-2xl font-bold">Welcome to GENPOS</h1>
        <p>This is your main dashboard content.</p>
      </div>
    </div>
  );
}
