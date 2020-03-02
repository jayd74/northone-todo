import React from 'react'
import { Scheduler, WeekView, Appointments, AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler'

const Appointment = ({ ...restProps }) => {
  const { title } = restProps.data

  return (
    <Appointments.AppointmentContent {...restProps} >
      <div>{title}</div>
    </Appointments.AppointmentContent>
  )
}

const Calendar = ({ list }) => {
  let calendarData = []
  list.forEach(item => {
    const { taskName, date } = item
    calendarData.push({
      startDate: date,
      title: taskName,
    })
  });

  return <Scheduler data={calendarData}>
    <ViewState
      currentDate={Date.now()}
    />
    <WeekView />
    <Appointments appointmentContentComponent={Appointment}/>
    <AppointmentTooltip/>
  </Scheduler>
};

export default Calendar;
