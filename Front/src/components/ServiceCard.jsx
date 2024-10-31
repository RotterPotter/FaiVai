import JobIcon from "./JobIcon";
import Ava from "./Ava";
import Rating from "./Rating";
import OffersCardField from "./ServiceCardField";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export default function ServiceCard({
  id,
  location,
  datetime,
  fullname,
  ratingScore,
  ratingQuantity,
  title,
  category,
  price,
  unit,
  createdAt,
}) {
  const date = new Date(datetime);
  const date_formated = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  const time = date.toLocaleTimeString();
  let time_formated = "";

  if (time.length === 11) {
    time_formated = time.slice(0, 5) + " " + time.slice(-2);
  } else {
    time_formated = time.slice(0, 4) + " " + time.slice(-2);
  }

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
    <Link to={`/offers/detail?id=${id}`}>
      <div className="flex flex-col font-semibold justify-between border border-green-500 text-sm hover:shadow-2xl  hover:-translate-y-1 shadow-lg w-[200px] h-[280px] rounded-3xl bg-white text-black/70">
        <div className="flex flex-col gap-1">
          <div className="w-full h-[60px] bg-green-500  rounded-t-3xl flex flex-col  justify-center items-center mb-2">
            <JobIcon iconType={category.toLowerCase()}></JobIcon>
            <p className="text-white ">{category}</p>
          </div>
          <OffersCardField name="Title" value={title}></OffersCardField>
          <OffersCardField name="Location" value={location}></OffersCardField>
          <OffersCardField name="Date" value={date_formated}></OffersCardField>
          <OffersCardField name="Time" value={time_formated}></OffersCardField>
          <OffersCardField name="Price" value={price + "€"}></OffersCardField>
        </div>
        <div className="flex flex-col mb-2">
          <div className="w-full flex px-4 gap-2 mb-1 text-xs text-bold">
            <Ava></Ava>
            <div className="w-full flex flex-col">
              <span className="text-left ">{fullname}</span>
              <Rating
                ratingScore={ratingScore}
                ratingQuantity={ratingQuantity}
              ></Rating>
            </div>
          </div>
          <span className="w-full text-right text-xs text-gray-500 px-2">
            {timeAgo(createdAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}
