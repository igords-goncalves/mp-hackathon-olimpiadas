"use client";

import HttpClientService from "@/services/HttpClient.service";
import CardDate from "../CardDate";
import CardEvent from "../CardEvent";
import { Skeleton } from "../ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Event } from "../../Models/Event.model";
import { groupEventsByDate } from "@/lib/helpers/groupEventsByDate";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React, { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

type ScheduleViewProps = {};

const ScheduleView = ({}: ScheduleViewProps) => {
  const httpClient = new HttpClientService();
  const searchParams = useSearchParams();

  const fetchEvents = async (): Promise<Event[]> => {
    const searchParams = new URLSearchParams(window.location.search);
    const page = searchParams.get("page") || "1";
    const data = await httpClient.get(`/events?page=${page}`);
    const response = await data.data;
    return response;
  };

  const { data, isPending, isLoading, isError } = useQuery<Event[]>({
    queryKey: ["schedule", searchParams.get("page") || "1"],
    queryFn: fetchEvents,
    refetchInterval: 10000,
  });

  //@ts-ignore //FIXME: EventModel[]
  const groupedEvents = groupEventsByDate(data?.data);

  const SkeletonCard = () => {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="w-full h-[60px] mt-6" />
        {Array(10)
          .fill(null)
          .map((_, index: number) => (
            <React.Fragment key={index}>
              <Skeleton className="w-full h-[215px]" />
            </React.Fragment>
          ))}
      </div>
    );
  };

  const PaginatedItens = () => {
    const pathName = usePathname();
    const router = useRouter();

    const handlePagination = (page: number) => {
      const params = new URLSearchParams(searchParams);
      if (page > 1) {
        params.set("page", page.toString());
      } else {
        params.delete("page");
      }

      const newUrl = `${pathName}?${params.toString()}`;
      router.push(newUrl, { scroll: false });
    };

    return (
      <div className="container w-full flex">
        <Pagination className="py-6 text-primary w-full flex-wrap list-none">
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer hover:bg-transparent hover:text-blue-950"
              onClick={() =>
                handlePagination(Number(searchParams.get("page") || 1) - 1)
              }
            >
              Anterior
            </PaginationPrevious>
          </PaginationItem>

          {
            //@ts-ignore
            data?.meta?.links.map((link, index) => {
              if (
                link.label === "&laquo; Anterior" ||
                link.label === "Próximo &raquo;"
              ) {
                return null;
              }

              return (
                <PaginationContent
                  key={`${link.url}${index}`}
                  className="w-fit"
                >
                  <PaginationItem className="mx-2">
                    <PaginationLink
                      onClick={() => handlePagination(Number(link.label))}
                      isActive={link.active}
                      className="border-none p-0 hover:bg-transparent hover:text-blue-950 cursor-pointer"
                      dangerouslySetInnerHTML={{
                        __html: link.label,
                      }}
                    ></PaginationLink>
                  </PaginationItem>
                </PaginationContent>
              );
            })
          }
          <PaginationItem>
            <PaginationNext
              className="cursor-pointer hover:bg-transparent hover:text-blue-950"
              onClick={() =>
                handlePagination(Number(searchParams.get("page") || 1) + 1)
              }
            >
              Próximo
            </PaginationNext>
          </PaginationItem>
        </Pagination>
      </div>
    );
  };

  const GrouppedEvents = () => {
    let eventsCount = 0;
    return Object.keys(groupedEvents).map((date: string, index: number) => {
      const events = groupedEvents[date];
      eventsCount += events.length;
      return (
        <React.Fragment key={index}>
          <CardDate event={events[0]} />
          {events.map((event: Event) => (
            <CardEvent key={event.id} event={event} />
          ))}
          {eventsCount >= 10 && <PaginatedItens />}
        </React.Fragment>
      );
    });
  };

  const IsError = ({ errorMessage }: { errorMessage: string }) => {
    return (
      <div className="flex items-center justify-center">
        <p className="font-medium text-xl text-destructive">{errorMessage}</p>
      </div>
    );
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col gap-6 mt-10">
        {isPending ? (
          <SkeletonCard />
        ) : isError ? (
          <IsError errorMessage="Nenhum evento encontrado..." />
        ) : (
          <GrouppedEvents />
        )}
      </div>
    </Suspense>
  );
};

export default ScheduleView;
