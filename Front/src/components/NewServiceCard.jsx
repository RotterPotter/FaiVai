import React from "react";
import { Link } from "react-router-dom";
import JobIcon from "./JobIcon";
import ServiceCardField from "./ServiceCardField";
import Ava from "./Ava";
import Rating from "./Rating";

export default function NewServiceCard(service) {
  const serviceData = service.service;
  console.log(serviceData);

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    );
  };

  const timeAgo = (created_at) => {
    const createdDate = new Date(created_at);
    const now = new Date();

    const differenceInMinutes = Math.floor((now - createdDate) / (1000 * 60));

    if (differenceInMinutes < 1) {
      return "Just now";
    } else if (differenceInMinutes < 60) {
      return `${differenceInMinutes} min ago`;
    } else if (differenceInMinutes < 1440) {
      return `${Math.floor(differenceInMinutes / 60)} hours ago`;
    } else if (isToday(createdDate)) {
      return `Today, ${format(createdDate, "HH:mm")}`;
    } else if (isYesterday(createdDate)) {
      return `Yesterday, ${format(createdDate, "HH:mm")}`;
    } else {
      return format(createdDate, "MMM d, yyyy, HH:mm");
    }
  };

  return (
    <Link
      to={"/service/detail?id=" + serviceData.id}
      className="flex flex-col justify-start items-center hover:-translate-y-2 transition-transform duration-200 border border-black/15 w-[200px] h-[280px] shadow-xl text-black/70 font-bold text-sm rounded-3xl"
    >
      <div className="flex flex-col p-3 justify-center items-center w-full bg-green-500 h-[60px] rounded-t-3xl">
        <JobIcon iconType={serviceData.category_name.toLowerCase()}></JobIcon>
        <p className="text-white font-bold text-sm">
          {serviceData.category_name}
        </p>
      </div>
      <div className="w-full pt-2 gap-1 flex flex-col justify-start  items-start">
        <ServiceCardField
          name="Title"
          value={serviceData.service_type_name}
        ></ServiceCardField>
        <ServiceCardField
          name="Location"
          value={serviceData.location_or_zone}
        ></ServiceCardField>

        <ServiceCardField
          name="Time"
          additionnalValue={serviceData.unit}
          value={serviceData.speed_per_unit + "min"}
        ></ServiceCardField>
        <ServiceCardField
          name="Price"
          additionnalValue={serviceData.unit}
          currency="€"
          value={serviceData.price_per_unit}
        ></ServiceCardField>
      </div>
      <div className="w-full h-full flex justify-start items-end ">
        <div className="w-full flex px-4 gap-2 mb-1 text-sm text-bold">
          <Ava></Ava>
          <div className="w-full flex flex-col">
            <span className="text-left  ">
              {serviceData.owner_firstname + serviceData.owner_lastname}
            </span>
            <Rating
              ratingScore={serviceData.owner_rating}
              ratingQuantity={serviceData.owner_rewievs_count}
            ></Rating>
          </div>
        </div>
      </div>
      <span className="w-full text-right text-xs text-gray-500 p-2">
        {timeAgo(serviceData.created_at)}
      </span>
    </Link>
  );
}
