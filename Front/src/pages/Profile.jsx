import React from "react";
import Gloria from "../assets/Gloria.png";
import RatingStar from "../components/RatingStar";
import LocationSVG from "../assets/SVG/LocationSVG";
import PhoneSVG from "../assets/SVG/PhoneSVG";
import EmailSVG from "../assets/SVG/EmailSVG";
import Review from "../components/Review";
import Arrow from "../assets/SVG/ArrowSVG";
import '../index.css'

export default function Profile() {
  const reviews = [{
    authorId: 1,
    authorName: "Tina Karol",
    authorImage: Gloria,
    rating: 4.5,
    comment: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt itaque totam corporis ratione velit? Aperiam ex eaque aut id! Necessitatibus culpa quas laboriosam magni laborum mollitia cupiditate esse pariatur praesentium! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat consequuntur, quod similique provident corrupti exercitationem deserunt quibusdam quam suscipit labore facilis mollitia error esse alias amet voluptatum repudiandae distinctio ipsa?",
    createdAtString: "2 hours ago",
  },{
    authorId: 1,
    authorName: "Tina Karol",
    authorImage: Gloria,
    rating: 4.5,
    comment: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt itaque totam corporis ratione velit? Aperiam ex eaque aut id! Necessitatibus culpa quas laboriosam magni laborum mollitia cupiditate esse pariatur praesentium! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat consequuntur, quod similique provident corrupti exercitationem deserunt quibusdam quam suscipit labore facilis mollitia error esse alias amet voluptatum repudiandae distinctio ipsa?",
    createdAtString: "2 hours ago",
  },{
    authorId: 1,
    authorName: "Tina Karol",
    authorImage: Gloria,
    rating: 4.5,
    comment: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt itaque totam corporis ratione velit? Aperiam ex eaque aut id! Necessitatibus culpa quas laboriosam magni laborum mollitia cupiditate esse pariatur praesentium! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat consequuntur, quod similique provident corrupti exercitationem deserunt quibusdam quam suscipit labore facilis mollitia error esse alias amet voluptatum repudiandae distinctio ipsa?",
    createdAtString: "2 hours ago",
  },{
    authorId: 1,
    authorName: "Tina Karol",
    authorImage: Gloria,
    rating: 4.5,
    comment: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt itaque totam corporis ratione velit? Aperiam ex eaque aut id! Necessitatibus culpa quas laboriosam magni laborum mollitia cupiditate esse pariatur praesentium! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat consequuntur, quod similique provident corrupti exercitationem deserunt quibusdam quam suscipit labore facilis mollitia error esse alias amet voluptatum repudiandae distinctio ipsa?",
    createdAtString: "2 hours ago",
  }, {
    authorId: 1,
    authorName: "Tina Karol",
    authorImage: Gloria,
    rating: 4.5,
    comment: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt itaque totam corporis ratione velit? Aperiam ex eaque aut id! Necessitatibus culpa quas laboriosam magni laborum mollitia cupiditate esse pariatur praesentium! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat consequuntur, quod similique provident corrupti exercitationem deserunt quibusdam quam suscipit labore facilis mollitia error esse alias amet voluptatum repudiandae distinctio ipsa?",
    createdAtString: "2 hours ago",
  },{
    authorId: 1,
    authorName: "Tina Karol",
    authorImage: Gloria,
    rating: 4.5,
    comment: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt itaque totam corporis ratione velit? Aperiam ex eaque aut id! Necessitatibus culpa quas laboriosam magni laborum mollitia cupiditate esse pariatur praesentium! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat consequuntur, quod similique provident corrupti exercitationem deserunt quibusdam quam suscipit labore facilis mollitia error esse alias amet voluptatum repudiandae distinctio ipsa?",
    createdAtString: "2 hours ago",
  },{
    authorId: 1,
    authorName: "Tina Karol",
    authorImage: Gloria,
    rating: 4.5,
    comment: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt itaque totam corporis ratione velit? Aperiam ex eaque aut id! Necessitatibus culpa quas laboriosam magni laborum mollitia cupiditate esse pariatur praesentium! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat consequuntur, quod similique provident corrupti exercitationem deserunt quibusdam quam suscipit labore facilis mollitia error esse alias amet voluptatum repudiandae distinctio ipsa?",
    createdAtString: "2 hours ago",
  },{
    authorId: 1,
    authorName: "Tina Karol",
    authorImage: Gloria,
    rating: 4.5,
    comment: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt itaque totam corporis ratione velit? Aperiam ex eaque aut id! Necessitatibus culpa quas laboriosam magni laborum mollitia cupiditate esse pariatur praesentium! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat consequuntur, quod similique provident corrupti exercitationem deserunt quibusdam quam suscipit labore facilis mollitia error esse alias amet voluptatum repudiandae distinctio ipsa?",
    createdAtString: "2 hours ago",
  }]

  return (
    <div className="mt-[100px] ">
      <div className="w-full flex justify-center mb-[20px]  ">
        <div className="w-[300px] h-[50px]  rounded-3xl flex jsutify-center items-center border border-black   bg-gray-200 ">
          <div className="py-3 px-6 w-1/2 text-center bg-green-500 rounded-3xl text-white">
            Text
          </div>
          <div className="py-3 px-6 w-1/2 text-center bg-gray-200 rounded-3xl">
            text
          </div>
        </div>
      </div>
      <div className="w-full  flex flex-col gap-5 lg:flex-row sm:gap-5 lg:px-32 px-5">
        <div className="bg-white  lg:border lg:border-black  lg:w-[400px] h-[500px] w-full  p-10 pt-5 rounded-xl flex flex-col justify-start items-start lg:items-center gap-3">
          <div className="w-full flex lg:flex-col lg:justify-start lg:items-center justify-center items-center  gap-3">
            <div className="rounded-full w-[200px] h-[200px] bg-white flex justify-center items-center">
              <img className="object-fill" src={Gloria} alt="Gloria" />
            </div>

            <div className="text-lg flex flex-col justify-center items-start w-full ">
              <span className="font-medium text-xl">Gloria Doe</span>
              <div className="flex  items-start text-xl  gap-1 w-full ">
                <RatingStar starSize="24px" type={1}></RatingStar>
                <span className=""> 4.5</span>
              </div>

              <span>#00924</span>
            </div>
          </div>

          <div className="flex flex-col justify-center items-start  w-full gap-1 border-t border-b border-black/50 py-3 ">
            <div className="flex justify-center items-start  ">
              <div className="w-8 ">
                <PhoneSVG size="22px"></PhoneSVG>
              </div>
              <span>Phone</span>
            </div>

            <div className="flex justify-center items-start  ">
              <div className="w-8 ">
                <EmailSVG size="22px"></EmailSVG>
              </div>

              <span>Email</span>
            </div>
            <div className="flex justify-center items-start  ">
              <div className="w-8 ">
                <LocationSVG size="22px"></LocationSVG>
              </div>

              <span>Location</span>
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
            <button className="px-10 py-1  rounded-full border border-black">
              Edit
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-5 w-full">
          <div className="bg-white  border border-black h-[200px] w-full p-5 rounded-xl">
            <div className=" text-lg font-semibold ">About</div>
            <p className="p-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
              nobis voluptatibus, eligendi voluptatum assumenda possimus eaque
              accusantium quam nisi molestias perspiciatis? Placeat maiores
              libero earum accusantium harum voluptatibus sit quas!
            </p>
          </div>

          <div className="bg-white  border border-black  w-full p-5 rounded-xl">
            <div className="w-full flex justify-between items-center pr-10 pb-5">
              <div className="flex gap-2 justify-start items-start font-semibold">
                <p className="text-lg ">Reviews</p>
                <span className="border border-black/50  px-1 py-0.5 rounded-lg text-sm flex juistify-center items-center">
                  1
                </span>
              </div>
              <div>sort</div>
            </div>

            <div className="p-1 h-[500px] overflow-auto custom-scrollbar">
              {reviews.map((review) => (
                <Review
                  key={review.authorId}
                  authorId={review.authorId}
                  authorName={review.authorName}
                  authorImage={review.authorImage}
                  rating={review.rating}
                  comment={review.comment}
                  createdAtString={review.createdAtString}
                ></Review>
              ))}
              {reviews.length > 0 && (
               <div className="flex gap-2 w-full justify-center mt-3 ">
               <button className="flex gap-2 justify-center items-center  border border-black rounded-2xl w-[160px] h-[32px]">
                 <Arrow degree={90}></Arrow>Previous
               </button>
               <button className="flex gap-2 justify-center items-center  border border-black rounded-2xl w-[160px] h-[32px]">
                 Next<Arrow degree={-90}></Arrow>
               </button>
             </div>
            )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
