import FirstButton from "../components/FirstButton";
import Search from "../components/Search";

import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function FindJobs() {
  const [token, setToken] = useContext(UserContext);

  return (
    <div className="flex flex-col justify-center gap-5 items-center mt-[100px]">
      <p className="text-center text-xl sm:text-3xl">
        Find a Work Nearby and Start Earning{" "}
        <div className="text-green-500">Extra Income</div>
      </p>
      <Search name={"Search location"}></Search>
      <div className="flex justify-between items-center w-full  max-w-[400px] sm:max-w-[600px] -mt-1"></div>
      <div className="flex gap-3">
        <FirstButton
          name="Register your service"
          navigateTo={"service/register/"}
        ></FirstButton>
        <FirstButton
          name="Find Services "
          navigateTo={"/services/find"}
        ></FirstButton>
        <FirstButton
          name="Find workers"
          navigateTo={"service/find-workers/"}
        ></FirstButton>
        <FirstButton
          name="Your services"
          navigateTo={"/your_services"}
        ></FirstButton>
      </div>
      {token && <div className="text-green-500 text-3xl mt-5">Logged In</div>}
    </div>
  );
}
