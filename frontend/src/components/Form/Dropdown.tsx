import React, { useEffect, useState, useRef } from "react";
import "./Dropdown.css";

interface Option {
  label: string;
  value: string | number;
}

interface DropdownProps {
  options: Option[];
  isSearchable?: boolean;
}

const Icon: React.FC = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

const Dropdown: React.FC<DropdownProps> = ({ options, isSearchable = false }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Option | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = () => setShowMenu(false);

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  useEffect(() => {
    setSearchValue("");
    if (showMenu && isSearchable && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showMenu, isSearchable]);

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const getDisplay = (): string => {
    if (selectedValue) {
      return selectedValue.label;
    }
    return "Select an option";
  };

  const onItemClick = (option: Option) => {
    setSelectedValue(option);
    setShowMenu(false);
  };

  const isSelected = (option: Option): boolean => {
    if (!selectedValue) {
      return false;
    }

    return selectedValue.value === option.value;
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const getOptions = (): Option[] => {
    if (!searchValue) {
      return options;
    }

    return options.filter((option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  return (
    <div className="dropdown-container">
      <div onClick={handleInputClick} className="dropdown-input">
        <div className="dropdown-selected-value">{getDisplay()}</div>
        {showMenu && (
          <div className="dropdown-menu">
            {isSearchable && (
              <input
                type="text"
                value={searchValue}
                onChange={onSearch}
                ref={searchRef}
                className="dropdown-search"
              />
            )}
            {getOptions().map((option) => (
              <div
                onClick={() => onItemClick(option)}
                key={option.value}
                className={`dropdown-item ${isSelected(option) && "selected"}`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
        <div className="dropdown-tools">
          <div className="dropdown-tool">
            <Icon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
