import * as React from "react";
import { cn } from "@/helpers/cn";

export interface CalendarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md" | "lg";
}

const Calendar = React.forwardRef<HTMLInputElement, CalendarProps>(
  ({ className, size = "md", type, ...props }, ref) => {
    const sizeClasses = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4",
      lg: "h-12 px-6 text-lg",
    };

    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-md border border-input bg-background text-sm ring-offset-background",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Calendar.displayName = "Calendar";

export { Calendar };
