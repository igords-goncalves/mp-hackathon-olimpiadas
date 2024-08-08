"use client";

import Discipline from "@/Models/Disciple.model";
import CardDisciplines from "../CardDiscipline";
import { useQuery } from "@tanstack/react-query";
import HttpClientService from "@/services/HttpClient.service";
import { Skeleton } from "../ui/skeleton";

type DisciplinesViewProps = {};

const DisciplinesView = ({}: DisciplinesViewProps) => {
  const httpClient = new HttpClientService();

  const fetchDisciplines = async (): Promise<Discipline[]> => {
    const data = await httpClient.get("/disciplines");
    const response = await data.data;
    return response.data;
  };

  const { data, isLoading, isPending, isError } = useQuery<Discipline[]>({
    queryKey: ["disciplines"],
    queryFn: fetchDisciplines,
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnReconnect: "always",
  });

  const IsError = ({ errorMessage }: { errorMessage: string }) => {
    return (
      <div className="flex items-center justify-center">
        <p className="font-medium text-xl text-destructive">{errorMessage}</p>
      </div>
    );
  };

  return (
    <div className="mt-10 flex flex-wrap items-center justify-center md:justify-between gap-6">
      {isPending ? (
        Array(30)
          .fill(null)
          .map((_, index: number) => (
            <Skeleton className="w-[223px] h-[239px]" key={index} />
          ))
      ) : isError ? (
        <IsError errorMessage="Nenhuma modalidade encontrada" />
      ) : (
        <CardDisciplines data={data} isPending={isPending} />
      )}
    </div>
  );
};

export default DisciplinesView;
