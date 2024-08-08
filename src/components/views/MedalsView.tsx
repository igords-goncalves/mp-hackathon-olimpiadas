"use client";

import { useQuery } from "@tanstack/react-query";
import TableMedals from "../TableMedals";
import Medal from "@/Models/Medal.model";
import HttpClientService from "@/services/HttpClient.service";
import { Skeleton } from "../ui/skeleton";

type MedalViewProps = {};

const MedalView = ({}: MedalViewProps) => {
  const httpClient = new HttpClientService();

  const fetchMedals = async (): Promise<Medal[]> => {
    const data = await httpClient.get("/countries");
    const response = await data.data;
    return response.data;
  };

  const { data, isPending, isLoading, isError } = useQuery<Medal[]>({
    queryKey: ["medals"],
    queryFn: fetchMedals,
    refetchInterval: 10000,
  });

  const IsError = ({ errorMessage }: { errorMessage: string }) => {
    return (
      <div className="flex items-center justify-center">
        <p className="font-medium text-xl text-destructive">{errorMessage}</p>
      </div>
    );
  };

  return (
    <div className="mt-10">
      {isPending ? (
        <Skeleton className="w-full h-screen" />
      ) : isError ? (
        <IsError errorMessage="Nenhum rank encontrado" />
      ) : (
        <TableMedals data={data} isPending={isPending} />
      )}
    </div>
  );
};

export default MedalView;
