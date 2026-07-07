<template>
  <div class="calendar-wrap">
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import type { EventClickArg, DateSelectArg } from '@fullcalendar/core'

const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
  },
  locale: 'ko',
  selectable: true,
  editable: true,
  events: [
    { title: '샘플 일정 1', start: new Date().toISOString().slice(0, 10) },
    { title: '샘플 일정 2', start: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10), end: new Date(Date.now() + 86400000 * 4).toISOString().slice(0, 10) },
    { title: '회의', start: new Date().toISOString().slice(0, 10) + 'T10:00:00' }
  ],
  select: (info: DateSelectArg) => {
    const title = window.prompt('일정 제목을 입력하세요')
    const calendarApi = info.view.calendar
    calendarApi.unselect()
    if (title) {
      calendarApi.addEvent({
        title,
        start: info.startStr,
        end: info.endStr,
        allDay: info.allDay
      })
    }
  },
  eventClick: (info: EventClickArg) => {
    if (window.confirm(`'${info.event.title}' 일정을 삭제할까요?`)) {
      info.event.remove()
    }
  }
})
</script>

<style scoped>
.calendar-wrap {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
}
</style>
