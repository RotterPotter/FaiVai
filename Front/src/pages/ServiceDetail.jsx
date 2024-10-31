import React, { useEffect, useState } from "react";
import OffersCardField from "../components/ServiceCardField";
import { Link } from "react-router-dom";
import ArrowSVG from "../assets/SVG/ArrowSVG";

export default function ServiceDetail() {
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [service, setService] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getService = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/services/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setService(data);
    } catch (error) {
      console.error("Failed to fetch service:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getService();
  }, []);

  return (
    <div className="w-full flex justify-center items-center mt-[100px]">
      <div className="w-full w-max-[1300px] flex justify-between items-center">
        <div>
          <p>{service.category_name}</p>
          <p>example</p>
          <p>example</p>
          <p>example</p>
          <p>example</p>
          <p>example</p>
          <p>example</p>
        </div>
      </div>
    </div>
  );
}
