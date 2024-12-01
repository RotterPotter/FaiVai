import FirstButton from "../components/FirstButton";
import Search from "../components/Search";

import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function FindJobs() {
  const [token, setToken, language, setLanguage] = useContext(UserContext);

  const textes = {
    en: {1: "Changed!", 2: "Extra Income", 3: "Search location", 4: "Register your service", 5: "Find Services", 6: "Your services", 7: "Logged In"},
    ru: {1: "Найди работу поблизости и начни зарабатывать", 2: "Дополнительный доход", 3: "Поиск местоположения", 4: "Зарегистрировать услугу", 5: "Найти услуги", 6: "Ваши услуги", 7: "Вошли"},
    it: {1: "Trova un lavoro nelle vicinanze e inizia a guadagnare", 2: "Entrata extra", 3: "Cerca posizione", 4: "Registra il tuo servizio", 5: "Trova servizi", 6: "I tuoi servizi", 7: "Loggato"},
  }
  

  return (
    <div className="flex flex-col justify-start gap-5 items-center mt-[100px] h-screen">
      <p className="text-center text-xl sm:text-3xl">
        {textes[language][1]}
        <div className="text-green-500">{textes[language][2]}</div>
      </p>
      <Search name={textes[language][3]}></Search>
      <div className="flex justify-between items-center w-full  max-w-[400px] sm:max-w-[600px] -mt-1"></div>
      <div className="flex gap-3">
        <FirstButton
          name={textes[language][4]}
          navigateTo={"service/register/"}
        ></FirstButton>
        <FirstButton
          name={textes[language][5]}
          navigateTo={"/services/find"}
        ></FirstButton>

        <FirstButton
          name={textes[language][6]}
          navigateTo={"/your_services"}
        ></FirstButton>
      </div>
      {token && <div className="text-green-500 text-3xl mt-5">{textes[language][7]}</div>}
    </div>
  );
}
