import FirstButton from "../components/FirstButton";
import Search from "../components/Search";
import Filter from "../components/Filter";

export default function FindJobs() {
  const searchFilters = [<Filter key="1" name="Category" />];
  return (
    <div className="flex flex-col justify-center gap-5 items-center mt-[80px]">
      <p className="text-center text-xl sm:text-3xl">
        Find a Work Nearby and Start Earning{" "}
        <div className="text-green-500">Extra Income</div>
      </p>
      <Search searchFilters={searchFilters}></Search>
      <div className="flex justify-between items-center w-full  max-w-[400px] sm:max-w-[600px] -mt-1">
        <FirstButton name="Map"></FirstButton>
        <FirstButton name="Catalog"></FirstButton>
        <FirstButton name="Messages"></FirstButton>
      </div>
    </div>
  );
}
