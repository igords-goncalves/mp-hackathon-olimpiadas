import { Event } from "@/Models/Event.model";
import { Card, CardContent } from "./ui/card";
import formatDate from "../lib/utils/formatterDate";

type CardDateProps = {
  event?: Event
};

const CardDate = ({ event }: CardDateProps) => {
  return (
    <Card className="shadow-sm bg-accent border-none rounded-lg">
      <CardContent className="flex items-center py-4 justify-center">
        <p className="text-xl text-primary font-extrabold">
          {formatDate(event?.day ?? "")?.toUpperCase() ?? ""}
        </p>
      </CardContent>
    </Card>
  );
};

export default CardDate;
