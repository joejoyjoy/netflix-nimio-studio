import Header from "@/components/Header";
import Home from "@/components/Home";
import MovieDialog from "@/components/movieDetailsDialog/MovieDialog";

export default function Page() {
  return (
    <>
      <Header role={"BASIC"} />
      <Home />
      <MovieDialog />
    </>
  );
}
