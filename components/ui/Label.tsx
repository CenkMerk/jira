import * as React from "react";
import { cn } from "@/helpers/cn";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  size?: "sm" | "md" | "lg";
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, size = "md", children, ...props }, ref) => {
    const sizeClasses = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    };

    return (
      <label
        ref={ref}
        className={cn(
          "text-foreground font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </label>
    );
  }
);
Label.displayName = "Label";

export { Label };