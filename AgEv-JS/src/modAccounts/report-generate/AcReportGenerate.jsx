import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TopHeader from "../../components/TopHeader";
import toast from "react-hot-toast";
import { FaRegFileExcel, FaRegFilePdf } from "react-icons/fa";
import { useDownloadFile } from "../../hooks/useDownloadFile";
import { Select2FromDb } from "../../components/Select2FromDB";
import { acReportNames } from "../../data/acReportNames";
import { Select2FromOptions } from "../../components/Select2FromOptions";
import { SelectFromOptions } from "../../components/SelectList";
import moment from "moment";
import { useGlobalContext } from "../../hooks/context";
import FromDatePicker from "../../components/FromDatePicker";
import TillDatePicker from "../../components/TillDatePicker";
import ReportLoading from "../../components/ReportLoading";
import BranchTreeView from "../../components/tree/branch/BranchTreeView";

const createSchema = (selectedReportName) => {
  const baseSchema = {
    reportName: yup.string().required("Report name is required."),
    selectedBranchIds: yup
      .array()
      .min(1, "At least one branch must be selected."),
    fromDate: yup.string().nullable(),
    tillDate: yup.string().nullable(),
  };

  if (selectedReportName === "Ledger") {
    baseSchema.ledgerId = yup
      .string()
      .test(
        "ledger-required",
        "Ledger is required",
        (value) => value && value !== "all"
      );
  } else if (selectedReportName) {
    const reportName = acReportNames.find(
      (rt) => rt.name === selectedReportName
    );
    if (reportName && reportName.fields.includes("ledgerId")) {
      baseSchema.ledgerId = yup.string();
    }
  }

  if (selectedReportName) {
    const reportName = acReportNames.find(
      (rt) => rt.name === selectedReportName
    );
    if (reportName && reportName.fields.includes("displayAt")) {
      baseSchema.displayAt = yup.string().required("Display At is required");
    }
  }

  return yup.object(baseSchema);
};

const AcReportGenerate = () => {
  const [reportFormat, setReportFormat] = useState("");
  const [selectedReportName, setSelectedReportName] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [tillDate, setTillDate] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const value = useGlobalContext();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(createSchema(selectedReportName)),
    defaultValues: {
      reportName: "",
      selectedBranchIds: [],
      fromDate: null,
      tillDate: null,
      ledgerId: "",
      displayAt: "",
    },
  });

  const handleReportNameChange = (reportName) => {
    setSelectedReportName(reportName);

    if (reportName === "Ledger") {
      setValue("ledgerId", "");
    } else if (reportName) {
      setValue("ledgerId", "all");
    }

    if (reportName === "Chart of Accounts") {
      setValue("displayAt", value.role === "Branch Manager" ? "BR" : "All");
    }

    if (reportName) {
      const reportConfig = acReportNames.find((rt) => rt.name === reportName);
      const requiredFields = reportConfig ? reportConfig.fields : [];

      if (!requiredFields.includes("from")) {
        setFromDate(null);
      }
      if (!requiredFields.includes("till")) {
        setTillDate(null);
      }

      reset(undefined, {
        keepValues: true,
        resolver: yupResolver(createSchema(reportName)),
      });
    }
  };

  const handleBranchSelection = (branchIds) => {
    setValue("selectedBranchIds", branchIds);
  };

  const downloadFile = useDownloadFile();

  const onSubmit = async (formData) => {
    if (
      formData.reportName === "Ledger" &&
      (!formData.ledgerId || formData.ledgerId === "all")
    ) {
      toast.error("Please select a specific ledger for Ledger reports");
      return;
    }

    const selectedReport = acReportNames.find(
      (rt) => rt.name === formData.reportName
    );
    const reportKey = selectedReport ? selectedReport.key : "";

    const reportParams = {
      reportKey: reportKey,
      branchIds: formData.selectedBranchIds?.join(",") || "",
      ledgerId: formData.ledgerId || "all",
      displayAt: formData.displayAt || "",
      reportFormat: reportFormat,
      ...(fromDate && {
        fromDate: moment
          .utc(fromDate, "DD-MMM-YYYY")
          .local()
          .format("YYYY-MM-DD"),
      }),
      ...(tillDate && {
        tillDate: moment
          .utc(tillDate, "DD-MMM-YYYY")
          .local()
          .format("YYYY-MM-DD"),
      }),
    };
    console.log(reportParams,'reportParams');

    try {
      await downloadFile(
        "/reports/download",
        "POST",
        reportParams,
        setSubmitting
      );
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download report.");
    }
  };

  const getRequiredFields = () => {
    if (!selectedReportName) return [];
    const reportName = acReportNames.find(
      (rt) => rt.name === selectedReportName
    );
    return reportName ? reportName.fields : [];
  };

  const requiredFields = getRequiredFields();
  const needsLedger =
    requiredFields.includes("ledgerId") || selectedReportName === "Ledger";
  const isLedgerReport = selectedReportName === "Ledger";
  const needsFromDate = requiredFields.includes("from");
  const needsTillDate = requiredFields.includes("till");
  const needsDisplayAt = requiredFields.includes("displayAt");

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Accounts Reports Generate" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={submitting ? "pointer-events-none opacity-50" : ""}
      >
        <div className="flex flex-col lg:flex-row gap-4 pb-2 items-center">
          <div className="w-full lg:w-1/2">
            <Select2FromOptions
              control={control}
              options={acReportNames.map((rt) => rt.name)}
              label="Report Name"
              name="reportName"
              errorMessage={errors.reportName?.message}
              onSelectionChange={handleReportNameChange}
            />
          </div>
          {needsLedger && (
            <div className="w-full lg:w-1/1">
              <Select2FromDb
                control={control}
                label={`Ledger Name${isLedgerReport ? " (Required)" : ""}`}
                path="/AcLedger/selectByNameRole"
                name="ledgerId"
                errorMessage={errors.ledgerId?.message}
              />
            </div>
          )}
          {(needsFromDate || needsTillDate) && (
            <div className="w-full lg:w-1/2 flex gap-2">
              {needsFromDate && (
                <div className="flex-1">
                  <FromDatePicker action={setFromDate} />
                </div>
              )}
              {needsTillDate && (
                <div className="flex-1">
                  <TillDatePicker action={setTillDate} />
                </div>
              )}
            </div>
          )}
          {needsDisplayAt && (
            <div className="w-full lg:w-1/2">
              <SelectFromOptions
                register={register}
                options={
                  value.role === "Branch Manager"
                    ? ["BR"]
                    : ["All", "HO", "BR", "HO & BR"]
                }
                label="Display At"
                name="displayAt"
                errorMessage={errors.displayAt?.message}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2">
            <div className="border border-gray-300 rounded-md">
              <BranchTreeView
                onBranchSelect={handleBranchSelection}
                viewFor="FIS"
              />
            </div>
            {errors.selectedBranchIds && (
              <p className="text-red-500 text-sm mt-2">
                {errors.selectedBranchIds.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end mb-2 mt-4 gap-3">
          {/* <button
            type="submit"
            className="btn-danger h-9"
            onClick={() => setReportFormat("PDF")}
            disabled={reportFormat === "PDF" && submitting}
          >
            <FaRegFilePdf size={24} />{" "}
            {reportFormat === "PDF" && submitting ? "Downloading..." : "PDF"}
          </button> */}
          <button
            type="submit"
            className="btn-success h-10 w-40"
            onClick={() => setReportFormat("Excel")}
            disabled={reportFormat === "Excel" && submitting}
          >
            <FaRegFileExcel size={24} />{" "}
            {reportFormat === "Excel" && submitting
              ? "Downloading..."
              : "Excel"}
          </button>
        </div>
      </form>
      {submitting && <ReportLoading />}
    </div>
  );
};

export default AcReportGenerate;
