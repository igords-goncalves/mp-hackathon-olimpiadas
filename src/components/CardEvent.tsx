import { CircleCheckBig, CircleOff, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Event } from "@/Models/Event.model";
import formatTime from "@/lib/utils/formatterTime";
import { Competitor } from "@/Models/Competitor.model";
import Image from "next/image";
import DialogDetails from "./DialogDetails";

type CardEventProps = {
  event: Event;
};

const CardEvent = ({ event }: CardEventProps) => {
  return (
    <Card className="shadow-sm bg-accent border-none rounded-lg">
      <CardHeader className="py-0 px-0 border-b border-muted">
        <header className="flex  flex-col items-center md:flex-row">
          <span className="border-b border-muted px-4 md:border-none md:px-8 py-4 w-full md:w-fit">
            <p className="text-lg font-bold text-primary">
              {formatTime(event.start_date)}
            </p>
          </span>
          <div className="w-full flex items-center justify-between flex-1 py-3 px-4 md:px-8 md:border-l md:border-muted">
            <div className="flex flex-col gap-3 ">
              <p className="font-bold text-lg text-primary">
                {event.discipline_name}
              </p>
              <p className="text-sm text-default">{event.event_name}</p>
            </div>
            <DialogDetails event={event} />
          </div>
        </header>
      </CardHeader>
      <CardContent className="p-4 py-6 md:py-4 md:px-8 border-b border-muted">
        <main className="">
          <p className="text-default text-sm ">{event.venue_name}</p>
        </main>
      </CardContent>
      {event.competitors.length > 0 && (
        <CardFooter className="p-4 py-6 md:px-8 md:py-4">
          <footer
            className={`grid ${
              event.competitors.length < 4
                ? "grid-cols-1"
                : "sm:grid-cols-2 md:grid-cols-3 grid-cols-1"
            } gap-4`}
          >
            {event.competitors.map((competitor: Competitor) => (
              <div
                key={competitor.country_id}
                className="flex items-center gap-4 min-w-60"
              >
                {competitor.country_flag_url === "" || (
                  <>
                    <Image
                      src={competitor.country_flag_url}
                      alt="country flag"
                      width={32}
                      height={32}
                    />
                    <p className="text-default text-sm">
                      {competitor.competitor_name}
                    </p>
                  </>
                )}
              </div>
            ))}
          </footer>
        </CardFooter>
      )}
    </Card>
  );
};

export default CardEvent;
