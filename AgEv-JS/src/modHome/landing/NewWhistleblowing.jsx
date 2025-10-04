import React from "react";

const NewWhistleblowing = () => {
  return (
    <div className="grid gap-8 justify-items-center max-w-3xl mx-auto">
      <div className="flex flex-wrap justify-center items-center gap-4 w-full">
        <div className="relative bg-gradient-to-br from-umojanavyblue/80 to-umojanavyblue text-white font-bold py-1 px-4 rounded-xl shadow-lg">
          <div className="absolute -bottom-1 left-4 w-2 h-2 bg-umojanavyblue transform rotate-45"></div>
          <span className="text-sm tracking-wide">WE WANT</span>
        </div>

        <div className="bg-gradient-to-br from-umojanavyblue/70 to-umojanavyblue/90 text-white font-bold py-1 px-4 rounded-full shadow-lg">
          <span className="text-sm tracking-wide">YOUR</span>
        </div>

        <div className="relative bg-gradient-to-br from-umojanavyblue to-umojanavyblue/60 text-white font-bold py-1 px-4 rounded-xl shadow-lg">
          <div className="absolute -bottom-1 right-4 w-2 h-2 bg-umojanavyblue/60 transform rotate-45"></div>
          <span className="text-sm tracking-wide">FEEDBACK</span>
        </div>
      </div>

      <div className="w-full max-w-lg">
        <div className="text-umojanavyblue text-center">
          <p className="text-sm">
            You can provide your feedback via the Agri Evolve self service platform
            anytime or if you have a concern you can tell us confidentially by
            emailing:
            <a
              href="mailto:grievance.committee@agrievolve.com"
              className="inline-flex items-center text-umojanavyblue font-bold text-md mb-8 px-5"
            >
              grievance.committee@agrievolve.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewWhistleblowing;