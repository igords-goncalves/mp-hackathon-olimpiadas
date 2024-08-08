import { Award, Circle, LandPlot } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Medal from "@/Models/Medal.model";
import Image from "next/image";
import { tableHeader } from "@/constants/RANK_HEADER";

type TableMedalsProps = {
  data?: Medal[];
  isPending: boolean;
};

const TableMedals = ({ data }: TableMedalsProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transpare bg-accent rounded-lg">
          {tableHeader.map((head) => (
            <TableHead key={head} className="text-default font-bold">
              {head}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="rounded-lg">
        {data?.map((rank, index) => (
          <TableRow
            key={rank.id}
            className={`${rank.name === "Brasil" ? "bg-green-100" : "bg-transparent"}`}
          >
            <TableCell className="text-default font-bold w-9">
              {rank.rank}
            </TableCell>
            <TableCell className="text-default font-medium">
              <div className="flex gap-2">
                <Image src={rank.flag_url} width={32} height={32} alt="Flags" />
                {rank.name}
              </div>
            </TableCell>
            <TableCell className="text-default font-medium w-96">
              <div className="flex gap-2">
                <LandPlot size={18} />
                {rank.continent}
              </div>
            </TableCell>
            <TableCell className="text-default font-medium">
              <div className="flex gap-2 items-start">
                <Circle fill="#FFD700" color="#FFD700" size={18} />
                {rank.gold_medals}
              </div>
            </TableCell>
            <TableCell className="text-default font-medium">
              <div className="flex gap-2 items-start">
                <Circle fill="#C0C0C0" color="#C0C0C0" size={18} />
                {rank.silver_medals}
              </div>
            </TableCell>
            <TableCell className="text-default font-medium">
              <div className="flex gap-2 items-start">
                <Circle fill="#B08D57" color="#B08D57" size={18} />
                {rank.bronze_medals}
              </div>
            </TableCell>
            <TableCell className="text-primary font-bold">
              <div className="flex gap-2">
                <Award size={18} />
                {rank.total_medals}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableMedals;
