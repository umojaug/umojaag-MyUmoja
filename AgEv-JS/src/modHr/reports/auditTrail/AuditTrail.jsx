import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import SearchDateRange from "../../../components/SearchDateRange";
import AuditTrailList from "./AuditTrailList";

const AuditTrail = () => {
	const [dataForm, setDataForm] = useState(false);

	return (
		<div className="card w-full max-w-screen-xl">
			<TopHeader title="Audit Trail Report" />
			<SearchDateRange action={setDataForm} />
			{dataForm && <AuditTrailList dataForm={dataForm} />}
		</div>
	);
};

export default AuditTrail;
