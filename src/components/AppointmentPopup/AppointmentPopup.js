import React from 'react';
import { useDispatch } from 'react-redux';

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { formatTime } from "../../base/datetime";
import { setExistingAppointment } from '../../store/appointmentSlice';

export default function AppointmentPopup({
    dayAppointments,
    isSelectable,
    expandedDate,
    onDateClick,
    onSetExpandedDate,
}) {
    const MAX_POPUP_APPOINTMENTS = 1;

    const dispatch = useDispatch();

    /**
     * Dispatches an action to set an existing appointment in the application state.
     /**
      * Handles the change in open state for a date cell in a calendar view
      * @param {boolean} open - Indicates whether the date cell is being opened (true) or closed (false)
      * @returns {void} This function doesn't return a value
      */
     * @param {Object} app - The appointment object to be set.
     * @returns {void} This function doesn't return a value.
     */
    const setAppointment = (app) => dispatch(setExistingAppointment(app));

    const handleOpenChange = (open) => {
        if (dayAppointments.length > MAX_POPUP_APPOINTMENTS) {
            onSetExpandedDate(open);
        }
        else {
            onDateClick();
            setAppointment(dayAppointments[0])
        }
    }

    return (
        dayAppointments.length > 0 &&
        <Popover open={expandedDate} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                        'absolute bottom-0 right-0 p-2 m-1 text-xs text-primary-foreground whitespace-pre-line',
                        isSelectable ? 'bg-green-600' : null,
                    )}
                    onClick={(e) => e.stopPropagation()}>
                    {dayAppointments.length > MAX_POPUP_APPOINTMENTS
                        ? `+${dayAppointments.length}`
                        /**
                         * Formats and joins appointment times for a day
                         * @param {Array} dayAppointments - An array of appointment objects for a specific day
                         * @returns {string} A string of formatted appointment times, each on a new line
                         */
                        : dayAppointments.map(app => formatTime(app.time)).join('\n')}
                </Button>
            </PopoverTrigger>
            {dayAppointments.length > MAX_POPUP_APPOINTMENTS &&
                <PopoverContent className="w-auto p-0 cursor-pointer" align="end">
                    {dayAppointments.map((app, index) => (
                        <div onClick={() => setAppointment(app)}
                            key={index}
                            className="grid gap-2 p-2 text-sm hover:bg-green-600 hover:text-primary-foreground">
                            {formatTime(app.time)}
                        </div>
                    ))}
                </PopoverContent>
            }
        </Popover>
    );
}