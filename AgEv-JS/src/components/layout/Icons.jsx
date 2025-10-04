import {
  AiOutlineBarChart,
  AiOutlineUser,
  AiOutlineBranches,
  AiOutlineShop,
  AiOutlineFileSearch,
  AiOutlineSwap,
  AiOutlineAccountBook,
  AiOutlineSetting,
  AiOutlineSolution,
  AiOutlineAntDesign,
  AiOutlineAppstoreAdd,
  AiOutlineBlock,
  AiOutlineCluster,
  AiOutlineFrown,
  AiOutlineUnorderedList,
  AiOutlineSnippets,
  AiFillDelete,
  AiOutlineMenu,
  AiOutlineBars,
  AiOutlineControl,
  AiOutlineDash,
  AiOutlineUsergroupAdd,
  AiOutlineUserDelete,
  AiOutlineIdcard,
  AiOutlineCloudServer,
  AiOutlineSchedule,
  AiOutlineReconciliation,
  AiOutlineApartment,
  AiOutlineCoffee,
  AiOutlineSend,
  AiOutlineMail,
  AiOutlineRead,
  AiOutlineFileText,
  AiOutlineTeam,
  AiOutlineUserAdd,
  AiOutlineGift,
  AiOutlineFilePpt,
  AiOutlineStop,
  AiOutlineBgColors,
  AiOutlineCarryOut,
  AiOutlineBank,
  AiOutlineCalculator,
  AiOutlineBorderOuter,
  AiOutlineBorderlessTable,
  AiOutlineDashboard,
  AiOutlineBook,
  AiOutlineFileImage,
  AiOutlineHdd,
  AiOutlineFile,
  AiOutlineCalendar,
  AiOutlineAreaChart,
  AiOutlineRedo,
  AiFillAccountBook,
  AiOutlineFontColors,
  AiFillCarryOut,
  AiOutlineUserSwitch,
  AiOutlineAudit,
  AiOutlineExpand,
  AiOutlinePlayCircle,
  AiOutlineContacts,
  AiOutlineRise,
  AiFillContainer,
  AiFillFileAdd,
  AiFillMoneyCollect,
  AiOutlineComment,
  AiOutlineUnlock,
  AiOutlineFieldTime,
  AiOutlineProfile,
  AiOutlineDesktop,
  AiOutlineOrderedList,
  AiOutlineCompress,
  AiOutlineCheckSquare,
  AiOutlineHome,
} from "react-icons/ai";
import {
  HiDocumentReport,
  HiOutlineDocumentSearch,
  HiOutlineViewBoards,
} from "react-icons/hi";
import {
  RiFolderReceivedFill,
  RiBankCardLine,
  RiListOrdered,
} from "react-icons/ri";
import { IoTrailSignOutline } from "react-icons/io5";
import { SiCountingworkspro } from "react-icons/si";
import {
  MdApproval,
  MdAssignment,
  MdOutlineTravelExplore,
  MdOutlineRequestQuote,
  MdSummarize,
  MdOutlineAccountBalanceWallet,
  MdPayment,
  MdStop,
  MdCalendarToday,
  MdAirplanemodeActive,
} from "react-icons/md";
import { BiBookContent, BiListPlus, BiReceipt } from "react-icons/bi";
import {
  BsFillJournalBookmarkFill,
  BsJournalText,
  BsSubtract,
  BsDoorOpenFill,
  BsGlobe,
} from "react-icons/bs";

import { ImAttachment } from "react-icons/im";
import { GiIncomingRocket } from "react-icons/gi";
import {
  FaLayerGroup,
  FaObjectUngroup,
  FaBook,
  FaFile,
  FaUnlockAlt,
  FaCube,
  FaSitemap,
} from "react-icons/fa";

const Icons = ({ name, size = 30 }) => {
  switch (name) {
    case "RiListOrdered":
      return <RiListOrdered size={size} />;
    case "HiDocumentReport":
      return <HiDocumentReport size={size} />;
    case "HiOutlineDocumentSearch":
      return <HiOutlineDocumentSearch size={size} />;
    case "BsGlobe":
      return <BsGlobe size={size} />;
    case "IoTrailSignOutline":
      return <IoTrailSignOutline size={size} />;
    case "BiListPlus":
      return <BiListPlus size={size} />;
    case "MdAirplanemodeActive":
      return <MdAirplanemodeActive size={size} />;
    case "FaSitemap":
      return <FaSitemap size={size} />;
    case "MdStop":
      return <MdStop size={size} />;
    case "MdCalendarToday":
      return <MdCalendarToday size={size} />;
    case "FaCube":
      return <FaCube size={size} />;
    case "FaFile":
      return <FaFile size={size} />;
    case "FaUnlockAlt":
      return <FaUnlockAlt size={size} />;
    case "FaBook":
      return <FaBook size={size} />;
    case "MdPayment":
      return <MdPayment size={size} />;
    case "FaObjectUngroup":
      return <FaObjectUngroup size={size} />;
    case "FaLayerGroup":
      return <FaLayerGroup size={size} />;
    case "GiIncomingRocket":
      return <GiIncomingRocket size={size} />;
    case "MdSummarize":
      return <MdSummarize size={size} />;
    case "AiOutlineBank":
      return <AiOutlineBank size={size} />;
    case "AiOutlineHome":
      return <AiOutlineHome size={size} />;
    case "AiOutlineCompress":
      return <AiOutlineCompress size={size} />;
    case "AiFillFileAdd":
      return <AiFillFileAdd size={size} />;
    case "AiFillContainer":
      return <AiFillContainer size={size} />;
    case "AiOutlineRise":
      return <AiOutlineRise size={size} />;
    case "AiOutlineCheckSquare":
      return <AiOutlineCheckSquare size={size} />;
    case "AiOutlineOrderedList":
      return <AiOutlineOrderedList size={size} />;
    case "AiOutlineDesktop":
      return <AiOutlineDesktop size={size} />;
    case "AiOutlineProfile":
      return <AiOutlineProfile size={size} />;
    case "AiOutlineFieldTime":
      return <AiOutlineFieldTime size={size} />;
    case "AiOutlineUnlock":
      return <AiOutlineUnlock size={size} />;
    case "AiOutlineComment":
      return <AiOutlineComment size={size} />;
    case "AiFillMoneyCollect":
      return <AiFillMoneyCollect size={size} />;
    case "AiFillAccountBook":
      return <AiFillAccountBook size={size} />;
    case "AiOutlineFontColors":
      return <AiOutlineFontColors size={size} />;
    case "AiOutlineUserSwitch":
      return <AiOutlineUserSwitch size={size} />;
    case "AiFillCarryOut":
      return <AiFillCarryOut size={size} />;
    case "AiOutlineAudit":
      return <AiOutlineAudit size={size} />;
    case "MdOutlineAccountBalanceWallet":
      return <MdOutlineAccountBalanceWallet size={size} />;
    case "RiBankCardLine":
      return <RiBankCardLine size={size} />;
    case "AiOutlineExpand":
      return <AiOutlineExpand size={size} />;
    case "AiOutlinePlayCircle":
      return <AiOutlinePlayCircle size={size} />;
    case "AiOutlineContacts":
      return <AiOutlineContacts size={size} />;
    case "AiOutlineBarChart":
      return <AiOutlineBarChart size={size} />;
    case "AiOutlineUser":
      return <AiOutlineUser size={size} />;
    case "AiOutlineBranches":
      return <AiOutlineBranches size={size} />;
    case "AiOutlineShop":
      return <AiOutlineShop size={size} />;
    case "AiOutlineFileSearch":
      return <AiOutlineFileSearch size={size} />;
    case "AiOutlineSwap":
      return <AiOutlineSwap size={size} />;
    case "AiOutlineSetting":
      return <AiOutlineSetting size={size} />;
    case "AiOutlineAreaChart":
      return <AiOutlineAreaChart size={size} />;
    case "AiOutlineCalendar":
      return <AiOutlineCalendar size={size} />;
    case "AiOutlineFile":
      return <AiOutlineFile size={size} />;
    case "AiOutlineHdd":
      return <AiOutlineHdd size={size} />;
    case "AiOutlineFileImage":
      return <AiOutlineFileImage size={size} />;
    case "AiOutlineBook":
      return <AiOutlineBook size={size} />;
    case "AiOutlineDashboard":
      return <AiOutlineDashboard size={size} />;
    case "AiOutlineBorderlessTable":
      return <AiOutlineBorderlessTable size={size} />;
    case "AiOutlineBorderOuter":
      return <AiOutlineBorderOuter size={size} />;
    case "AiOutlineCalculator":
      return <AiOutlineCalculator size={size} />;
    case "AiOutlineCarryOut":
      return <AiOutlineCarryOut size={size} />;
    case "AiOutlineBgColors":
      return <AiOutlineBgColors size={size} />;
    case "AiOutlineStop":
      return <AiOutlineStop size={size} />;
    case "AiOutlineFilePpt":
      return <AiOutlineFilePpt size={size} />;
    case "AiOutlineGift":
      return <AiOutlineGift size={size} />;
    case "AiOutlineUserAdd":
      return <AiOutlineUserAdd size={size} />;
    case "AiOutlineTeam":
      return <AiOutlineTeam size={size} />;
    case "AiOutlineFileText":
      return <AiOutlineFileText size={size} />;
    case "AiOutlineRead":
      return <AiOutlineRead size={size} />;
    case "AiOutlineMail":
      return <AiOutlineMail size={size} />;
    case "AiOutlineSend":
      return <AiOutlineSend size={size} />;
    case "AiOutlineCoffee":
      return <AiOutlineCoffee size={size} />;
    case "AiOutlineApartment":
      return <AiOutlineApartment size={size} />;
    case "AiOutlineReconciliation":
      return <AiOutlineReconciliation size={size} />;
    case "AiOutlineSchedule":
      return <AiOutlineSchedule size={size} />;
    case "AiOutlineCloudServer":
      return <AiOutlineCloudServer size={size} />;
    case "AiOutlineIdcard":
      return <AiOutlineIdcard size={size} />;
    case "AiOutlineUserDelete":
      return <AiOutlineUserDelete size={size} />;
    case "AiOutlineUsergroupAdd":
      return <AiOutlineUsergroupAdd size={size} />;
    case "AiOutlineDash":
      return <AiOutlineDash size={size} />;
    case "AiOutlineControl":
      return <AiOutlineControl size={size} />;
    case "AiOutlineBars":
      return <AiOutlineBars size={size} />;
    case "AiOutlineMenu":
      return <AiOutlineMenu size={size} />;
    case "AiFillDelete":
      return <AiFillDelete size={size} />;
    case "AiOutlineSnippets":
      return <AiOutlineSnippets size={size} />;
    case "AiOutlineUnorderedList":
      return <AiOutlineUnorderedList size={size} />;
    case "AiOutlineFrown":
      return <AiOutlineFrown size={size} />;
    case "AiOutlineCluster":
      return <AiOutlineCluster size={size} />;
    case "AiOutlineBlock":
      return <AiOutlineBlock size={size} />;
    case "AiOutlineAppstoreAdd":
      return <AiOutlineAppstoreAdd size={size} />;
    case "AiOutlineAntDesign":
      return <AiOutlineAntDesign size={size} />;
    case "AiOutlineSolution":
      return <AiOutlineSolution size={size} />;
    case "AiOutlineAccountBook":
      return <AiOutlineAccountBook size={size} />;
    case "BsFillJournalBookmarkFill":
      return <BsFillJournalBookmarkFill size={size} />;
    case "BsJournalText":
      return <BsJournalText size={size} />;
    case "BsSubtract":
      return <BsSubtract size={size} />;
    case "BsDoorOpenFill":
      return <BsDoorOpenFill size={size} />;
    case "BiBookContent":
      return <BiBookContent size={size} />;
    case "BiReceipt":
      return <BiReceipt size={size} />;
    case "ImAttachment":
      return <ImAttachment size={size} />;

    case "AiOutlineRedo":
      return <AiOutlineRedo size={size} />;
    case "MdApproval":
      return <MdApproval size={size} />;
    case "MdOutlineTravelExplore":
      return <MdOutlineTravelExplore size={size} />;
    case "MdOutlineRequestQuote":
      return <MdOutlineRequestQuote size={size} />;
    case "SiCountingworkspro":
      return <SiCountingworkspro size={size} />;
    case "MdAssignment":
      return <MdAssignment size={size} />;
    case "RiFolderReceivedFill":
      return <RiFolderReceivedFill size={size} />;
    case "HiOutlineViewBoards":
      return <HiOutlineViewBoards size={size} />;
    default:
      return <></>;
  }
};

export default Icons;
