import React from "react";

const ExitInterview = ({ interview }) => {
  const isVisable = interview.length > 0 ? true : false;
  return (
    <>
      {isVisable ? (
        <div>
          <div className="flex justify-between px-0 pb-2 text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600">
            Exit interview
          </div>

          <div>
            <div>
              <p className="font-semibold">
                1. Reason of reason of leaving (more than one reason may be
                given if appropriate):
              </p>
              <p>
                Answer: {interview[0].betterOffer === false ? "False" : "True"}
              </p>
            </div>
            <div>
              <p className="font-semibold">
                2. Did you share your desire to leave the company/concerns with
                immediate supervisor prior to leaving?
              </p>
              <p>Answer: {interview[0].informSupervisor}</p>
            </div>
            <div>
              <p className="font-semibold">
                3. Did you receive constructive feedback to help improve your
                situation?
              </p>
              <p>Answer: {interview[0].feedback}</p>
            </div>
            <div>
              <p className="font-semibold">
                4. How easy was it easy here, to get the resources, (branch
                equipment, transport, security, cell phone etc.) you needed to
                do your job well?
              </p>
              <p>Answer: {interview[0].resources}</p>
            </div>
            <div>
              <p className="font-semibold">
                5. How helpful was your position here in stimulating your
                professional growth?
              </p>
              <p>Answer: {interview[0].growth}</p>
            </div>

            <div>
              <p className="font-semibold">
                6. How well were you paid here for the work you did?
              </p>
              <p>Answer: {interview[0].payment}</p>
            </div>

            <div>
              <p className="font-semibold">
                7. How often did you feel your contributions were recognized?
              </p>
              <p>Answer: {interview[0].recognized}</p>
            </div>

            <div>
              <p className="font-semibold">
                8. How reasonable were decisions (e.g. work load distribution,
                leave acceptance, recommend for promotion, etc.) made by your
                supervisor?
              </p>

              <p>Answer: {interview[0].recognized}</p>
            </div>

            <div>
              <p className="font-semibold">
                9. How comfortable did you feel voicing your opinion? (e.g.
                opinion on change of process, product, new ideas etc.)
              </p>
              <p>Answer: {interview[0].voicing}</p>
            </div>
            <div>
              <p className="font-semibold">
                10. How well did your supervisor treat you? (e.g. common
                behavior, praising good work, health discussion, handling
                mistakes professionally etc.)
              </p>
              <p>Answer: {interview[0].treat}</p>

              <div>
                <p className="font-semibold">
                  11. How much did you like your co-workers?
                </p>
                <p>Answer: {interview[0].coworkers}</p>
              </div>
            </div>
            <div>
              <p className="font-semibold">
                12. How did the members of your team work together?
              </p>
              <p>Answer: {interview[0].teamMembers}</p>
            </div>
            <div>
              <p className="font-semibold">
                13. In a typical week, how often did you feel stressed at work?
              </p>
              <p>Answer: {interview[0].stressed}</p>
            </div>
            <div>
              <p className="font-semibold">
                14. How difficult was it for you to balance your work and
                personal life while working here?"
              </p>
              <p>Answer: {interview[0].workBalance}</p>
            </div>
            <div>
              <p className="font-semibold">
                15. How safe did you feel here at your work place?
              </p>
              <p>Answer: {interview[0].safePlace}</p>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default ExitInterview;
