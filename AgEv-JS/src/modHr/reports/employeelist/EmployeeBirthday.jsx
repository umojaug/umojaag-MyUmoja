import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import EmployeeBirthdayList from "./EmployeeBirthdayList";
import SearchMonthYear from "../../../components/SearchMonthYear";

const EmployeeBirthday = () => {
	const [dataForm, setDataForm] = useState(false);

	return (
		<div className="card w-full max-w-screen-xl">
			<TopHeader title="Birthday List" />
			<SearchMonthYear action={setDataForm} displayYear={false} />
			{dataForm && <EmployeeBirthdayList dataForm={dataForm} />}
		</div>
	);
};

export default EmployeeBirthday;
