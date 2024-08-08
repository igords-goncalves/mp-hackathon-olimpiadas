import Image from "next/image";
import { Card, CardContent, CardHeader } from "./ui/card";
import Discipline from "@/Models/Disciple.model";

type CardDisciplinesProps = {
  data?: Discipline[];
  isPending: boolean;
};

const CardDisciplines = ({ data }: CardDisciplinesProps) => {
  return (
    <>
      {data?.map((discipline) => (
        <Card key={discipline.id} className="border-accent h-[239px] w-[223px] shadow-sm py-2 px-6">
          <CardHeader className="flex items-center justify-center">
            <div className="p-8 w-fit rounded-full bg-primary">
              <Image
                src={discipline.pictogram_url_dark}
                width={62}
                height={62}
                alt="Modalidade Pictograma"
              />
            </div>
          </CardHeader>
          <CardContent className="text-default text-center w-full items-center justify-center p-0 flex font-semibold text-md">{discipline.name}</CardContent>
        </Card>
      ))}
    </>
  );
};

export default CardDisciplines;
