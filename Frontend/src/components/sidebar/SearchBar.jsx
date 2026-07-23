import { SearchIcon } from "../common/icons.jsx";

export function SearchBar({ value, onChange }) {
    return (
        <div className="sidebar-search">
            <SearchIcon />
            <input
                type="text"
                placeholder="Search chats"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
