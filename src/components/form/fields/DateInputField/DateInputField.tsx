import React from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import jalali from 'jalali-dayjs';

dayjs.extend(jalali);

interface DateInputFieldProps {
  label: string;
  name: string;
  value: string | null;
  onChange: (name: string, value: string | null) => void;
  required?: boolean;
  className?: string;
}

const DateInputField: React.FC<DateInputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
  className = '',
}) => {
  // Safe parse
  const safeValue: Dayjs | null =
    value && dayjs(value).isValid() ? dayjs(value) : null;

  const handleChange = (date: Dayjs | null) => {
    onChange(name, date?.toISOString() || null);
  };

  return (
    <div className={`form__group ${className}`}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fa">
        <DatePicker
          label={label}
          value={safeValue}
          onChange={handleChange}
          slotProps={{
            textField: {
              required,
              fullWidth: true,
              variant: 'outlined',
              size: 'small',
            } as any,
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default DateInputField;
