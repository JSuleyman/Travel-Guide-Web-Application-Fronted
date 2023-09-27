import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const DateRangeFilter = ({ onDateFilter }) => {
    const [dateRange, setDateRange] = useState([
        {
            startDate: null,
            endDate: null,
            key: 'selection',
        },
    ]);
    const [isDateRangePickerOpen, setIsDateRangePickerOpen] = useState(false);

    const handleSelect = (ranges) => {
        setDateRange([ranges.selection]);
    };

    const handleApply = () => {
        const selectedRange = dateRange[0];
        if (selectedRange.startDate && selectedRange.endDate) {
            onDateFilter(selectedRange.startDate, selectedRange.endDate);
        }
    };

    const openDateRangePicker = () => {
        setIsDateRangePickerOpen(true);
    };

    const closeDateRangePicker = () => {
        setIsDateRangePickerOpen(false);
    };

    return (
        <div>
            <h2>Tarih Aralığı Filtresi</h2>
            <button onClick={openDateRangePicker}>Tarih Aralığı Seç</button>
            {isDateRangePickerOpen && (
                <div>
                    <DateRangePicker
                        ranges={dateRange}
                        onChange={handleSelect}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        direction="horizontal"
                        editableDateInputs={false} // Tarihleri düzenlemeyi devre dışı bırakır
                    />
                    <button onClick={handleApply}>Filtrele</button>
                    <button onClick={closeDateRangePicker}>Kapat</button>
                </div>
            )}
        </div>
    );
};

export default DateRangeFilter;
