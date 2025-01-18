"use client";

import * as React from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/helpers/cn";

export interface DropdownOption {
  label?: string;
  value?: any;
  [key: string]: any;
}

export interface DropdownProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "value" | "onChange"> {
  value?: any;
  onChange?: (value: any) => void;
  options?: DropdownOption[];
  optionLabel?: string;
  optionValue?: string;
  placeholder?: string;
  disabled?: boolean;
  itemTemplate?: (option: DropdownOption) => React.ReactNode;
  valueTemplate?: (option: DropdownOption) => React.ReactNode;
  showClear?: boolean;
  className?: string;
  containerClassName?: string;
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      className,
      containerClassName,
      value,
      onChange,
      options = [],
      optionLabel = "label",
      optionValue = "value",
      placeholder = "Select an option",
      disabled,
      itemTemplate,
      valueTemplate,
      showClear,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedOption, setSelectedOption] =
      React.useState<DropdownOption | null>(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const selected = options.find(
        (opt) => opt[optionValue] === value || opt === value
      );
      setSelectedOption(selected || null);
    }, [value, options, optionValue]);

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option: DropdownOption) => {
      const newValue = option[optionValue] ?? option;
      onChange?.(newValue);
      setIsOpen(false);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange?.(null);
      setSelectedOption(null);
    };

    const defaultInputClasses = [
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 cursor-pointer",
      "text-sm ring-offset-background placeholder:text-muted-foreground",
      "focus:outline-none",
      "disabled:cursor-not-allowed disabled:opacity-50",
    ].join(" ");

    return (
      <div ref={dropdownRef} className={cn("relative", containerClassName)}>
        <div
          className={cn(defaultInputClasses, className)}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          {...props}
        >
          <div className="flex-1 truncate">
            {selectedOption ? (
              valueTemplate ? (
                valueTemplate(selectedOption)
              ) : (
                selectedOption[optionLabel] || selectedOption
              )
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {showClear && selectedOption && (
              <button
                onClick={handleClear}
                className="rounded-full p-1 hover:bg-accent"
                aria-label="Clear selection"
              >
                <X className="h-3 w-3" />
              </button>
            )}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </div>
        </div>
        {isOpen && (
          <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 shadow-md bg-white">
            <ul className="py-1" role="listbox">
              {options.map((option, index) => {
                const isSelected =
                  option[optionValue] === value || option === value;
                return (
                  <li
                    key={index}
                    className={cn(
                      "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
                      "hover:bg-accent hover:text-accent-foreground",
                      "focus:bg-accent focus:text-accent-foreground",
                      isSelected && "bg-accent text-accent-foreground"
                    )}
                    onClick={() => handleSelect(option)}
                    role="option"
                    aria-selected={isSelected}
                  >
                    {itemTemplate ? (
                      itemTemplate(option)
                    ) : (
                      <>
                        <span className="flex-1">
                          {option[optionLabel] || option}
                        </span>
                        {isSelected && <Check className="ml-2 h-4 w-4" />}
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";

export { Dropdown };
