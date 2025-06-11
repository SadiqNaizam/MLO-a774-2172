import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DateRangePickerProps {
  className?: string;
  initialDateRange?: DateRange;
  onDateRangeChange?: (range: DateRange | undefined) => void;
  maxDays?: number; // Optional: limit the number of days in the range
  disabled?: boolean;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  className,
  initialDateRange,
  onDateRangeChange,
  maxDays,
  disabled,
}) => {
  const [date, setDate] = useState<DateRange | undefined>(initialDateRange);
  const [isOpen, setIsOpen] = useState(false);

  console.log("Rendering DateRangePicker, current range:", date);

  const handleSelect = (selectedRange: DateRange | undefined) => {
    console.log("Date range selected:", selectedRange);
    setDate(selectedRange);
    if (onDateRangeChange) {
      onDateRangeChange(selectedRange);
    }
    // Optional: close popover on select, or keep open for adjustments
    // setIsOpen(false); 
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            disabled={disabled}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
            max={maxDays} // react-day-picker interprets max as number of days from today if mode is range and no specific date is given
            disabled={disabled}
          />
           <div className="p-3 border-t border-border flex justify-end gap-2">
             <Button variant="ghost" size="sm" onClick={() => { setDate(undefined); if(onDateRangeChange) onDateRangeChange(undefined); }}>Clear</Button>
             <Button size="sm" onClick={() => setIsOpen(false)}>Apply</Button>
           </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default DateRangePicker;