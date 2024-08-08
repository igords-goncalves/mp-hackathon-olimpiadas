import { Event } from "@/Models/Event.model";

export const groupEventsByDate = (data?: Event[]) => {
  const groupedEvents: { [date: string]: Event[] } = {};

  if (data) {
    data.forEach((event: Event) => {
      const date = event.day;
      if (!groupedEvents[date]) {
        groupedEvents[date] = [];
      }
      groupedEvents[date].push(event);
    });
  }

  return groupedEvents
}