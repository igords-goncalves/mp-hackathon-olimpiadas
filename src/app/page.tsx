import ScheduleView from "@/components/views/ScheduleView";
import { Suspense } from "react";

const Home = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ScheduleView />
  </Suspense>
);

export default Home;