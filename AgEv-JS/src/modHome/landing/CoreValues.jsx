import React from "react";

const values = [
  {
    image: "/icons/Core-Values-Consistency.svg",
    title: "Transparency",
    subTitle: "",
    description: "We will be open and honest in our work, clear about our objectives, our successes and where we need to improve.",
  },
  {
    image: "/icons/Core-Values-Integrity.svg",
    title: "Excellence",
    subTitle: "",
    description: "We will always set high standards and strive for excellence ourselves and expect it from those we work with.",
  },
    {
    image: "/icons/Core-Values-Unity.svg",
    title: "Integrity",
    subTitle: "",
    description: "We will operate with integrity and honesty in all things.",
  },
  {
    image: "/icons/Core-Values-Positivity.svg",
    title: "Innovation",
    subTitle: "",
    description: "We aim to be at the forefront of development of the agricultural sector, and to lead the way forward looking for new dynamic sustainable and reliable solutions to challenges faced.",
  },
  {
    image: "/icons/Core-Values-Ambition.svg",
    title: "People",
    subTitle: "",
    description: "We recognise that people are at the centre of all that we do and will treat everyone with respect. We will have a high regard and priority for staff development within the organisation.",
  },
];

const ValueBody = ({ data }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center">
      {data.map((value, index) => (
        <div
          className="group w-full md:w-60 lg:w-65 rounded-bl-[10px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[10px] relative p-0 md:p-4 shadow-md flex flex-col items-center bg-transparent transition-all duration-700 overflow-hidden cursor-pointer h-[60px] md:h-[90px]"
          key={index}
        >
          <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center opacity-100 group-hover:opacity-0 group-hover:-translate-y-full transition-all duration-700">
            <img
              src={value.image}
              alt={value.title}
              className="mb-1 w-6 sm:w-8 h-4 sm:h-6 object-contain"
            />
            <h3 className="text-xs sm:text-sm font-bold md:text-md text-umojablue">
              {value.title}
            </h3>
          </div>

          <div className="text-umojablue absolute top-full left-0 right-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:top-0 md:group-hover:top-0">
            <h4 className="text-xs sm:text-sm font-bold md:text-md mb-1">
              {value.subTitle}
            </h4>
            <p className="text-center text-xs md:text-xs px-0 md:px-2">
              {value.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const CoreValues = () => {
  return (
    <div className="">
      <div className="flex justify-center text-lg md:text-2xl font-bold text-umojablue py-1">
        Core Values
      </div>
      <div className="md:flex justify-center text-center text-sm text-umojablue py-1 hidden">
        At Agri Evolve, our core values are the driving force behind how we do
        business and how we treat each other and our clients. By following these
        guiding principles, we believe we will always do our best to do the
        right thing in the right way and build fulfilling careers for our team
        members.
      </div>
      <ValueBody data={values.slice(0, 3)} />
      <ValueBody data={values.slice(3)} />
    </div>
  );
};

export default CoreValues;
