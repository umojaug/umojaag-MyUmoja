import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import EmployeeNewList from "./EmployeeNewList";
import SearchDateRange from "../../../components/SearchDateRange";

const EmployeeNew = () => {
	const [dataForm, setDataForm] = useState(false);

	return (
		<div className="card w-full max-w-screen-xl">
			<TopHeader title="New Join & Appoinment Letter" />
			<SearchDateRange action={setDataForm} />
			{dataForm && <EmployeeNewList dataForm={dataForm} />}
		</div>
	);
};

export default EmployeeNew;
