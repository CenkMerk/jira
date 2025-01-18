import * as React from "react";
import { cn } from "@/helpers/cn";

export interface InputNumberProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  size?: "sm" | "md" | "lg";
  min?: number;
  max?: number;
  step?: number;
}

const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
  ({ className, size = "md", min, max, step = 1, onChange, ...props }, ref) => {
    const sizeClasses = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4",
      lg: "h-12 px-6 text-lg",
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      // Allow empty value
      if (value === "") {
        onChange?.(event);
        return;
      }

      const numValue = parseFloat(value);

      // Validate number
      if (isNaN(numValue)) return;

      // Check min/max constraints
      if (min !== undefined && numValue < min) return;
      if (max !== undefined && numValue > max) return;

      onChange?.(event);
    };

    return (
      <input
        type="number"
        className={cn(
          "flex w-full rounded-md border border-input bg-background text-sm ring-offset-background",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          sizeClasses[size],
          className
        )}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        ref={ref}
        {...props}
      />
    );
  }
);
InputNumber.displayName = "InputNumber";

export { InputNumber };
