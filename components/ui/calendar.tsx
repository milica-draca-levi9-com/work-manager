'use client';

import type * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = false,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        day: 'hover:bg-blue-100 text-center min-w-7 rounded-md',
        disabled: 'opacity-30',
        selected: 'bg-blue-500 text-white',
        today: 'bg-blue-100 text-blue-700',
        day_selected: 'bg-blue-500 text-white',
        day_today: 'bg-blue-100 text-blue-700',
        day_outside: 'text-gray-500 opacity-50',
        day_hidden: 'invisible',
        day_range_middle: 'bg-blue-500 text-white',
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
