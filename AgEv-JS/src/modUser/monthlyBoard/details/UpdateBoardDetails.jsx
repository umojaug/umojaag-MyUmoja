import toast from "react-hot-toast";
import { usePostData } from "../../../hooks/dataApi";
import TopHeader from "../../../components/TopHeader";
import InputCell from "../../../components/InputCell";
import ReadOnlyCell from "../../../components/ReadOnlyCell";

const UpdateBoardDetails = ({ data, refetch }) => {
  const { mutateAsync } = usePostData();

  const handleUpdate = async (
    metricName,
    fieldType,
    value,
    initialValue,
    metricId
  ) => {
    const cleanValue = value.replace(/,/g, "");
    const numericValue = cleanValue === "" ? null : parseFloat(cleanValue);
    const initialNumericValue =
      initialValue === "" || initialValue == null
        ? null
        : parseFloat(initialValue);

    if (numericValue === initialNumericValue) {
      return;
    }
    if (numericValue !== null && !isNaN(numericValue) && numericValue >= 0) {
      try {
        const fieldTypeMapping = {
          actual: "ytdActual",
          budgeted: "ytdBudgeted",
        };

        console.log("Value changed - calling API:", {
          metricId: metricId,
          metricName: metricName,
          field: fieldTypeMapping[fieldType],
          oldValue: initialNumericValue,
          newValue: numericValue,
        });

        await mutateAsync({
          path: "/boardMonthDetails/update",
          formData: {
            metricId: metricId,
            field: fieldTypeMapping[fieldType],
            newValue: numericValue,
          },
        });
      } catch (error) {
        if (error.response) {
          toast.error("Response : " + error.response.data);
        } else if (error.request) {
          toast.error("Request : " + error.message);
        } else {
          toast.error("Error: " + error.message);
        }
      } finally {
        refetch();
      }
    }
  };

  const groupedMetrics =
    data?.reduce((acc, metric) => {
      const dept = metric.departmentType;
      if (!acc[dept]) {
        acc[dept] = [];
      }
      acc[dept].push(metric);
      return acc;
    }, {}) || {};

  return (
    <div className="p-6 bg-white">
      <TopHeader
        title="Update Board Details"
        btn="Return"
        path="/monthly/board/list"
      />

      {Object.entries(groupedMetrics).map(([department, metrics]) => (
        <div key={department} className="mb-2 text-sm">
          <h3 className="text-lg font-semibold mb-2 text-blue-600">
            {department} Department
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-2 py-1 text-center font-semibold">
                    Metrics
                  </th>
                  <th className="border border-gray-300 px-2 py-1 text-center font-semibold">
                    YTD Actual
                  </th>
                  <th className="border border-gray-300 px-2 py-1 text-center font-semibold">
                    YTD Budgeted
                  </th>
                  <th className="border border-gray-300 px-2 py-1 text-center font-semibold">
                    YTD Variance
                  </th>
                  <th className="border border-gray-300 px-2 py-1 text-center font-semibold">
                    YTD Variance %
                  </th>
                </tr>
              </thead>
              <tbody>
                {metrics.map((metric) => (
                  <tr key={metric.metricId} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-1 font-medium">
                      {metric.metricName}
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <InputCell
                        placeholder="Enter actual"
                        initialValue={metric.ytdActual}
                        onBlur={(e) =>
                          handleUpdate(
                            metric.metricName,
                            "actual",
                            e.target.value,
                            metric.ytdActual,
                            metric.metricId
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <InputCell
                        placeholder="Enter budgeted"
                        initialValue={metric.ytdBudgeted}
                        onBlur={(e) =>
                          handleUpdate(
                            metric.metricName,
                            "budgeted",
                            e.target.value,
                            metric.ytdBudgeted,
                            metric.metricId
                          )
                        }
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <ReadOnlyCell value={metric.ytdVariance} />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <ReadOnlyCell
                        value={
                          metric.ytdVariancePercent
                            ? `${metric.ytdVariancePercent}%`
                            : metric.ytdVariancePercent
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpdateBoardDetails;
