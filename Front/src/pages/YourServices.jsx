import React from "react";
import ServiceCard from "../components/ServiceCard";
import { useState, useEffect } from "react";
import { set } from "date-fns";
import NewServiceCard from "../components/NewServiceCard";

export default function YourServices() {
  const [services, setServices] = useState([]);

  const getUserServices = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/services/get_by_owner",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ owner_id: localStorage.getItem("user_id") }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Failed to fetch user services:", error);
    }
  };

  useEffect(() => {
    getUserServices();
  }, []);

  return (
    <div className="flex flex-wrap gap-5 justify-center items-center w-full  mt-[100px]">
      {services.map((service) => (
        <NewServiceCard key={service.id} service={service}></NewServiceCard>
      ))}
    </div>
  );
}
