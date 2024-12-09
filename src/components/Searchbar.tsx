import { cn } from "@/lib/utils";
import { IoIosSearch } from "react-icons/io";

export default function SearchBar({
  isSidebarOpen,
}: {
  isSidebarOpen: boolean;
}) {
  return (
    <div className="search-bar">
      <div className="search-icon">
        <IoIosSearch />
      </div>
      <input
        type="text"
        placeholder={isSidebarOpen ? "Search..." : "Search your page..."}
        className={cn(["search-input w-20", { "w-[400px]": isSidebarOpen }])}
      />
      <div className="search-shortcut">⌘K</div>
    </div>
  );
}
