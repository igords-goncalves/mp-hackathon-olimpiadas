import { PropsWithChildren } from "react";

type ScheduleEventsProps = PropsWithChildren;

const Main = ({children}: ScheduleEventsProps) => {
  return (
    <main className="container mx-auto">
      {children}
    </main>
  );
};

export default Main;
