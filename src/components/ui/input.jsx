/* eslint-disable react/prop-types */
import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef(
  ({ className, leftIcon, rightIcon, type, ...props }, ref) => {
    return (
      <div
        className={cn(
          `flex h-10 items-center rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2`,
          className,
        )}
      >
        {leftIcon}
        <input
          type={type}
          className={cn(
            `w-full ${leftIcon && 'pl-2'} ${rightIcon && 'pr-2'} placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`,
            className,
          )}
          ref={ref}
          {...props}
        />
        {rightIcon}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
