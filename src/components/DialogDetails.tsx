import { Event } from "@/Models/Event.model";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  CircleCheckBig,
  CircleOff,
  Plus,
  UnfoldHorizontal,
} from "lucide-react";
import Image from "next/image";
import { Competitor } from "@/Models/Competitor.model";
import formatTime from "@/lib/utils/formatterTime";
import { Badge } from "./ui/badge";
import formatDate from "@/lib/utils/formatterDate";
type DialogDetailsProps = {
  event: Event;
};

const DialogDetails = ({ event }: DialogDetailsProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="text-secondary gap-1 items-center rounded-lg">
          <Plus size={12} color="white" className="mb-0.5" />
          Detalhes
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-accent rounded-lg">
        <DialogHeader>
          <div className="absolute top-4 float-left ">
            {event.status === "Finished" ? (
              <Badge
                variant="default"
                className=" bg-red-500 text-secondary text-xs"
              >
                Finalizado
              </Badge>
            ) : (
              <Badge
                variant="default"
                className=" bg-green-400 text-secondary text-xs"
              >
                Em andamento
              </Badge>
            )}
          </div>
          <DialogTitle className="flex gap-6 flex-col items-center justify-center">
            <Image
              src={event.discipline_pictogram}
              width={96}
              height={96}
              alt="Pictograma"
            />
            <h1 className="text-default font-bold text-2xl">
              {event.discipline_name}
            </h1>
          </DialogTitle>
          <DialogDescription className="">
            <header className="py-0 px-0 border-b border-muted">
              <div className="flex  flex-col items-center md:flex-row">
                <span className="border-b border-muted px-4 md:border-none md:px-8 py-4 w-full md:w-fit">
                  <p className="text-lg font-bold text-primary">
                    {formatTime(event.start_date)}
                  </p>
                </span>
                <div className="w-full flex items-center justify-between flex-1 py-3 px-4 md:px-8 md:border-l md:border-muted">
                  <div className="flex flex-col gap-3 pl-1">
                    <p className="font-bold text-lg text-primary">
                      {event.event_name}{" "}
                    </p>
                    <p className="text-sm text-default">
                      {event.detailed_event_name}
                    </p>
                  </div>
                </div>
              </div>
            </header>
            <main className="p-4 py-6 md:py-4 md:px-8 border-b border-muted w-full">
              <div className="flex items-center justify-between w-full">
                <p className="text-default">
                  {formatDate(event?.day as string)}
                </p>
                <p className="text-default text-sm ">{event.venue_name}</p>
              </div>
            </main>
            {event.competitors.length < 3 ? (
              <footer className="p-4 py-6 md:px-8 md:py-4">
                <div className="flex flex-col items-start gap-4">
                  {event.competitors.map((competitor: Competitor) => (
                    <div
                      key={competitor.country_id}
                      className="flex items-center gap-4 w-full"
                    >
                      <Image
                        src={competitor.country_flag_url}
                        alt="country flag"
                        width={32}
                        height={32}
                      />
                      <div className="flex items-center justify-between w-full">
                        <p className="text-default">
                          {competitor.competitor_name}
                        </p>
                        <p>
                          {competitor.result_winnerLoserTie === "W" ? (
                            <CircleCheckBig color="#32e385" size={18} />
                          ) : (
                            <CircleOff color="#e33232" size={18} />
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </footer>
            ) : (
              <footer className="p-4 py-6 md:px-8 md:py-4">
                <div className="flex flex-col items-start gap-4">
                  {event.competitors
                    .filter(
                      (competitor: Competitor) =>
                        competitor.result_winnerLoserTie === "W"
                    )
                    .map((competitor: Competitor) => (
                      <div
                        key={competitor.country_id}
                        className="flex items-center gap-4 w-full"
                      >
                        <Image
                          src={competitor.country_flag_url}
                          alt="country flag"
                          width={32}
                          height={32}
                        />
                        <div className="flex items-center justify-between w-full">
                          <p className="text-default">
                            {competitor.competitor_name}
                          </p>
                          <p>
                            <CircleCheckBig color="#32e385" size={18} />
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </footer>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <main className="p-4 py-6 md:py-4 md:px-8 border-t border-muted w-full">
            <div className="flex items-center justify-between w-full">
              <p className="text-default text-sm">
                {formatDate(event?.start_date as string)}
              </p>
              <p>
                <UnfoldHorizontal color="#347eb7" />
              </p>
              <p className="text-default text-sm">
                {formatDate(event?.end_date as string)}
              </p>
            </div>
          </main>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDetails;
