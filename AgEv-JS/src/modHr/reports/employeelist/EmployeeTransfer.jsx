import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import EmployeeTransferList from "./EmployeeTransferList";
import SearchDateRange from "../../../components/SearchDateRange";

const EmployeeTransfer = () => {
	const [dataForm, setDataForm] = useState(false);

	return (
		<div className="card w-full max-w-screen-xl">
			<TopHeader title="Transfer List" />
			<SearchDateRange action={setDataForm} />
			{dataForm && <EmployeeTransferList dataForm={dataForm} />}
		</div>
	);
};

export default EmployeeTransfer;
