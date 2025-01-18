import * as React from "react";
import { cn } from "@/helpers/cn";

export interface InputTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  autoResize?: boolean;
  size?: "sm" | "md" | "lg";
}

const InputTextarea = React.forwardRef<HTMLTextAreaElement, InputTextareaProps>(
  ({ className, autoResize = false, size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "py-2 px-3 text-sm",
      md: "py-3 px-4",
      lg: "py-4 px-6 text-lg",
    };

    return (
      <textarea
        className={cn(
          "flex w-full rounded-md border border-input bg-background text-sm ring-offset-background",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          autoResize && "resize-none",
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
InputTextarea.displayName = "InputTextarea";

export { InputTextarea };
