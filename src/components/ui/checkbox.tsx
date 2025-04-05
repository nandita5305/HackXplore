
import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

// Create a CheckboxItem component (wrapper around Checkbox with label support)
interface CheckboxItemProps extends React.ComponentPropsWithoutRef<typeof Checkbox> {
  id?: string;
  value: string;
}

const CheckboxItem = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  CheckboxItemProps
>(({ id, value, ...props }, ref) => (
  <Checkbox ref={ref} id={id || `checkbox-${value}`} value={value} {...props} />
))
CheckboxItem.displayName = "CheckboxItem"

// Create a CheckboxGroup component
interface CheckboxGroupProps {
  value: string[];
  onValueChange: (value: string[]) => void;
  children: React.ReactNode;
  className?: string;
}

const CheckboxGroup = React.forwardRef<
  HTMLDivElement,
  CheckboxGroupProps
>(({ value, onValueChange, children, className }, ref) => {
  // Clone children to inject the checked state and onChange handler
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child) && child.props.value) {
      // Get the checkbox's value from the child props
      const childValue = child.props.value;
      
      return React.cloneElement(child, {
        checked: value.includes(childValue),
        onCheckedChange: (checked: boolean) => {
          if (checked) {
            onValueChange([...value, childValue]);
          } else {
            onValueChange(value.filter(v => v !== childValue));
          }
        }
      });
    }
    return child;
  });

  return (
    <div ref={ref} className={cn("space-y-2", className)}>
      {childrenWithProps}
    </div>
  );
});
CheckboxGroup.displayName = "CheckboxGroup";

export { Checkbox, CheckboxItem, CheckboxGroup }
