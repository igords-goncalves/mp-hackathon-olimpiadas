import { Competitor } from "./Competitor.model";

export interface Event {
  competitors: Competitor[];
  day: string;
  detailed_event_name: string;
  discipline_name: string;
  discipline_pictogram: string;
  end_date: string;
  event_name: string;
  id: number;
  is_live: number;
  is_medal_event: number;
  name: string | null;
  start_date: string;
  status: string;
  venue_name: string;
}