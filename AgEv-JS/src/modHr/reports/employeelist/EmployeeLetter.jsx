import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import moment from "moment";
import { AiOutlinePrinter } from "react-icons/ai";
//import { useReactToPrint } from "react-to-print";
import { jsPDF } from "jspdf";

const EmployeeLetter = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("employeesletter", `/hrreports/letter/${id}`);

  const componentRef = useRef();
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });

  const handlePrint = () => {
    var doc = new jsPDF("p", "pt", "letter");
    doc.html(componentRef.current, {
      callback: function (doc) {
        doc.save();
      },
      margin: [80, 50, 100, 50],
    });
  };

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;
  return (
    <div className="card w-full max-w-screen-xl text-justify font-['Helvetica']">
      <div className="flex justify-between px-10 pb-2">
        <div className="text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600">
          Appoinment Letter
        </div>
        <div className="flex space-x-5">
          <div className="">
            <button onClick={handlePrint}>
              <AiOutlinePrinter size={30} />
            </button>
          </div>
        </div>
      </div>
      <div className="pl-5">
        <div
          className="grid w-2/3 pl-5 pr-8 text-[10px] tracking-wide"
          ref={componentRef}
        >
          <p className="mb-4">
            {moment.utc(new Date()).local().format("DD-MMM-YYYY")}
          </p>
          <p className="">PIN : {list.data.employeePin}</p>
          <p className="font-bold">
            {list.data.gender === "Female"
              ? "Ms. " + list.data.employeeName
              : "Mr. " + list.data.employeeName}
          </p>
          <p className="mb-4">{list.data.contactAddress}</p>
          <p className="mb-4">Dear {list.data.employeeName},</p>
          <p className="mb-4 font-bold pb-2">
            RE: APPOINTMENT TO THE POST OF{" "}
            {list.data.designationName.toUpperCase()}
          </p>
          <p className="mb-2">
            Reference is made to the offer letter with Umoja.
          </p>
          <p className="mb-2">
            We have the pleasure of offering you an employment opportunity with
            Umoja Microfinance (Uganda) Limited (hereinafter referred to as “the
            company”) as a{" "}
            <span className="font-bold">{list.data.designationName}</span>.
          </p>
          <p className="mb-2 font-bold">
            Your appointment will be subject to the following terms and
            conditions of service:
          </p>
          <p className="flex space-x-2 mb-2">
            <p className="font-bold">01.</p>
            <p className="grid">
              <p className="font-bold">DURATION OF CONTRACT</p>
              <p>
                Your employment with the company under this Contract will be for
                a period of 18 (eighteen) months subject to renewal depending on
                your performance and behaviour, and will commence on{" "}
                <span className="font-bold">
                  {moment
                    .utc(list.data.joiningDate)
                    .local()
                    .format("DD-MMM-YYYY")}
                </span>
                . It shall be subject to the satisfactory completion of a
                probationary period as indicated in clause 4 below.
              </p>
            </p>
          </p>
          <p className="flex space-x-2 mb-2">
            <p className="font-bold">02.</p>
            <p className="grid">
              <p className="font-bold">OFFICE-HOURS</p>
              <p>
                The official working hours from Monday to Friday will be
                8:00A.M. –5:00P.M, with the exception of public holidays. You
                will be entitled to an hour for lunch per day. You may also be
                required to work beyond the official working hours, due to the
                nature of your job, and as the situation at the Company
                requires. Your Duty Station shall be{" "}
                <span className="font-bold">
                  {list.data.officName === "Head branch"
                    ? "Head branch"
                    : list.data.branchName + " Branch"}
                </span>
                . However, the Company may transfer you to other locations from
                time to time as per the organization requirements.
              </p>
            </p>
          </p>
          <p className="flex space-x-2 mb-2">
            <p className="font-bold">03.</p>
            <p className="grid">
              <p className="font-bold">EMUNERATION</p>
              <p>
                Your Monthly Gross Consolidated Salary will be{" "}
                <span className="font-bold">
                  {import.meta.env.VITE_CURRENCY}{" "}
                  {list.data.grossSalary.toLocaleString("en-US")}/=
                </span>
                . Your gross salary shall be payable into your bank account and
                it would be subject to Pay As You Earn (PAYE), National Social
                Security Fund(NSSF), Local service Tax (LST) deductions and any
                other statutory deductions which the company is or may be
                required to deduct at source in accordance with any relevant
                statutory regulatory laws of Uganda.
                <br />
                Salaries shall be reviewed every 18 (eighteen) months by the
                company. Salary increments, if any shall however, will always be
                at the discretion of management and the company, and will also
                be based on performance of the company, performance of the
                employee and the prevailing market conditions.
              </p>
            </p>
          </p>
          <p className="flex space-x-2 mt-4 mb-2 print:mt-32">
            <p className="font-bold">04.</p>
            <p className="grid">
              <p className="font-bold">PROBATIONARY PERIOD</p>
              <p>
                Your employment term shall commence with an initial probationary
                period of six (6) months running from the effective date stated
                above. There will be a review after three (3) months. <br />
                Your confirmation in the role/position will depend on the
                receipt of satisfactory performance report from your
                Supervisor/Line Manager. The successful completion of your
                probation will be communicated to you in writing.
              </p>
            </p>
          </p>
          <p className="flex space-x-2 mb-2">
            <p className="font-bold">05.</p>
            <p className="grid">
              <p className="font-bold">TRAVEL FACILITATION</p>
              <p>
                The facilitation for travel will be provided as per the company
                policy.
              </p>
            </p>
          </p>
          <p className="flex space-x-2 mb-2">
            <p className="font-bold">06.</p>
            <p className="grid">
              <p className="font-bold">ANNUAL LEAVE</p>
              <p>
                During the course of your employment with us you will be
                entitled to twenty-one (21) days as per the Employment Act of
                Uganda 2006.
              </p>
            </p>
          </p>
          <p className="flex space-x-2 mb-2">
            <p className="font-bold">07.</p>
            <p className="grid">
              <p className="font-bold">SICK LEAVE</p>
              <p>
                During the course of your employment with us you will be
                entitled to sick leave as per the Human Resource Manual and in
                accordance with the Employment Act of Uganda, 2006.
              </p>
            </p>
          </p>
          <p className="flex space-x-2 mb-2">
            <p className="font-bold">08.</p>
            <p className="grid">
              <p className="font-bold">INVESTMENT CLUB</p>
              <p>
                Upon joining Umoja Microfinance Uganda limited you will
                automatically become a member of the Umoja Microfinance
                investment club where you will be able to save a certain
                percentage of your salary and have access to other services as
                per the investment club by-laws and constitution.
              </p>
            </p>
          </p>
          <p className="flex space-x-2 mb-2">
            <p className="font-bold">09.</p>
            <p className="grid">
              <p className="font-bold">TERMINATION</p>
              <p>
                Termination of contract will occur in the event of occurrence of
                either of the following: by issuance of notice of termination in
                accordance with this agreement, expiry of the contract term,
                retirement, summary dismissal, protracted illness, permanent
                disability or death, as the case may be.
              </p>
              <p className="my-2">
                Either party to this contract may during its term, terminate
                this contract by giving written notice of its or his/her
                intention to terminate employment or payment equivalent to the
                required notice period thereof as per the Employment Act Uganda
                2006.
              </p>
              <p>
                In the unlikely event of gross misconduct on your part the
                company reserves the right to terminate your contract summarily.
              </p>
            </p>
          </p>
          <p className="flex space-x-2 mb-2 print:mt-32">
            <p className="font-bold">10.</p>
            <p className="grid">
              <p className="font-bold">
                FURTHER TERMS AND CONDITIONS OF YOUR EMPLOYMENT
              </p>
              <p>
                Any terms and conditions not specifically addressed in this
                contract or dealt with in terms of the company rules, policies
                or procedures are governed by the Employment Act of Uganda,
                2006, regulations thereunder and other applicable laws.
                <br />
                You are requested to return the enclosed copy duly signed as a
                token of your acceptance of the terms and conditions of your
                employment.
              </p>
            </p>
          </p>
          <p className="flex space-x-2 mb-2  mt-5">
            <p className="font-bold">11.</p>
            <p className="grid">
              <p className="font-bold">ACCEPTANCE</p>
              <p>
                This contract is submitted to you in duplicate. If the terms are
                acceptable to you, we expect you to kindly endorse your
                acceptance, on both copies. We would like to congratulate you on
                this appointment and look forward to working with you.
              </p>
            </p>
          </p>
          <p className="grid mb-2">
            <span className="mt-10">Yours sincerely,</span>
            <span className="mt-10 font-bold">Komugisha Grace</span>
            <span className="mb-1">Human Resource Manager</span>
            <span className="mb-1">Umoja Microfinance (SMC) Limited</span>
            <span className="mb-1">Phone: +256-0782956438/0758200281</span>
          </p>
          <p className="grid mb-2">
            <span className="font-bold">C.C Accounts Dept.</span>
            <span className="font-bold">C.C CEO</span>
            <p className="mt-2">
              I ………………………………………………………. accept the appointment of UMOJA
              Microfinance (SMC) Limited as{" "}
              <span className="font-bold">{list.data.designationName}</span> on
              the terms and conditions of service set out above.
            </p>
            <p className="mt-2">
              Signature: …………………………………… Date:
              ........................................................................
            </p>
          </p>
          <div className="grid mt-20 border border-black font-bold w-1/2 print:w-full mb-2 print:mt-56">
            <div className="grid grid-cols-2 border-b border-black">
              <div className="px-3 py-1 ">Job title: </div>
              <div className="px-3 py-1 border-l border-black">
                {list.data.designationName}
              </div>
            </div>
            <div className="grid grid-cols-2 border-b border-black">
              <div className="px-3 py-1 ">Work Location: </div>
              <div className="px-3 py-1 border-l border-black">
                {list.data.branchName}
              </div>
            </div>
            <div className="grid grid-cols-2 border-b border-black">
              <div className="px-3 py-1 ">Department: </div>
              <div className="px-3 py-1 border-l border-black">
                {list.data.departmentName}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-3 py-1 ">Reports to: </div>
              <div className="px-3 py-1 border-l border-black">Manager</div>
            </div>
          </div>
          <p className="mb-2">
            Umoja Microfinance exists to serve and empower people to build
            brighter futures together. Umoja means “unity” in Swahili. We are in
            this together, and together, we can learn, grow, and transform
            lives. We serve our shareholders, our board, our team, and most
            importantly, our clients. We believe in service one step beyond.{" "}
            <br /> <br />
            <br />
            We will transform the Microfinance industry by pursuing excellence
            in all we do. Transformation isn’t easy; but we are committed to
            excellence by going to a client’s home when they need extra help,
            creating new products with the latest software to meet our clients’
            needs, and building an ambitious culture of consistency and
            positivity.
          </p>
          <p className="w-full mt-4 border-b border-black font-bold pb-2">
            Overall Job purpose
          </p>
          <p className="mt-2">
            In your role as Loan Branchr, you are an integral part of our core
            Operations Team at Umoja Microfinance. As a loan branchr you will
            evaluate and process credit and loan applications. Research
            applicants' financial status, references, credit history and
            evaluate their ability to repay the loan.
          </p>
          <p className="w-full mt-4 border-b border-black font-bold pb-2">
            key Performance Indicators
          </p>
          <p className="mt-2">
            <span className="font-bold">Period: First Three (3 Months)</span>
            <ul className="list-none pl-10">
              <li>
                • First Month has a marketing target of Twenty (20) admissions
              </li>
              <li>• Second Month has a target of fifty (50) borrowers</li>
              <li>• Third Month has a target of fifty (50) borrowers</li>
              <li>• Group formation by loan branchr.</li>
              <li>• Maintain discipline in groups 100%</li>
              <li>• Verification before admission 100%</li>
              <li>• Assessment of client’s property 100%</li>
              <li>
                • Daily time management in branch and the field,8am reporting
                time.
              </li>
              <li>
                • Behavior patter i.e. team player, integrity, good
                communication.
              </li>
            </ul>
          </p>
          <p className="w-full mt-4 border-b border-black font-bold pb-2">
            Day to Day Duties and responsibilities
          </p>
          <p className="mt-2">
            <ul className="list-none pl-10">
              <li>
                • To market Umoja Microfinance products by clearly explaining to
                individuals the types of loans and credit options available as
                well as the terms of loans.
              </li>
              <li>
                • To analyze and assess the applicant’s credibility to determine
                feasibility of granting loans.
              </li>
              <li>
                • To carry out proper verification of both the individual’s
                business premises as well as residence prior to recommendation
                for a loan.
              </li>
              <li>
                • To evaluate loan applications and documents to confirm
                authenticity.
              </li>
              <li>
                • To approve loans and present to the respective Branch Manager
                for final Approval.
              </li>
              <li>
                • To update clients about any new policy that may be passed by
                the Company and ensure implementation of the same.
              </li>
              <li>
                • To ensure that the disbursed loans are recovered back within
                the stipulated period.
              </li>
              <li>
                <br />
              </li>
              <li>
                • To review and update accurate information required concerning
                the loans.
              </li>
              <li>
                • To obtain and record accurate information about the clients.
              </li>
              <li>• Update in time all the necessary record books. </li>
              <li>• Any other duty that may be assigned to you.</li>
            </ul>
          </p>
          <p className="w-full mt-4 border-b border-black font-bold pb-2">
            Our Values
          </p>
          <p className="mt-2">
            In addition to your day-to-day responsibilities, as a team member of
            Umoja Microfinance Ltd., we take pride in acting as{" "}
            <span className="font-bold">Brand Ambassadors</span> for our company
            in all that we do. We strive to make this a great place to work and
            an organization that our communities are proud of. To ensure that we
            do this our core company values should be at the center of all that
            we do:
          </p>
          <p className="font-bold mt-4">
            Be Consistent – Do the simple tasks right every day, every time
          </p>
          <p className="font-bold mt-4">
            Be Ambitious – Strive to innovate, grow, and improve in all you do
          </p>
          <p className="font-bold mt-4">
            Be Positive – Stay Upbeat and keep a fun attitude
          </p>
          <p className="font-bold mt-4">
            Have Integrity – The quality of being honest and having strong moral
            principles.
          </p>
          <p className="w-full mt-4 border-b border-black font-bold pb-2">
            Skills
          </p>
          <p className="mt-2">
            <ul className="list-none pl-10">
              <li>• Familiarity with computers and software applications</li>
              <li>
                • Solid understanding of direct/indirect lending products and
                practices
              </li>
              <li>• Excellent communication and interpersonal skills</li>
              <li>
                • Customer satisfaction orientation and sales competencies
              </li>
              <li>• Ability to work in a goal oriented environment</li>
            </ul>
          </p>
          <p className="font-bold mt-10">
            I hereby agree to abide and adhere to this Job Description at all
            times and I have also understood the key performance
            indicators(KPI’s) for the period of three (3) months. I also confirm
            that I have read and understood it and that I have received all the
            relevant training to be able to complete all tasks required:
          </p>
          <p className="mt-8 font-bold">
            Signature: …………………………………… Date:
            ..............................................................
          </p>
          <p className="mt-2 mb-4 font-bold">Employee</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLetter;
