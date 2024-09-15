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
    onSetExpandedDate,
}) {
    const MAX_POPUP_APPOINTMENTS = 1;

    const dispatch = useDispatch();
    
    return (
        dayAppointments.length > 0 &&
        <Popover open={expandedDate} onOpenChange={onSetExpandedDate}>
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
                        : dayAppointments.map(app => formatTime(app.time)).join('\n')}
                </Button>
            </PopoverTrigger>
            {dayAppointments.length > MAX_POPUP_APPOINTMENTS &&
                <PopoverContent className="w-auto p-0 cursor-pointer" align="end">
                    <div className="grid gap-2 p-2">
                        {dayAppointments.map((app, index) => (
                            <div onClick={() => dispatch(setExistingAppointment(app))} key={index} className="text-sm whitespace-nowrap">
                                {formatTime(app.time)}
                            </div>
                        ))}
                    </div>
                </PopoverContent>
            }
        </Popover>
    );
}