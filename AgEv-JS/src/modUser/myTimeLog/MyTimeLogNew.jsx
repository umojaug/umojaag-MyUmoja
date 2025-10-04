import React, { useState } from "react";

import MyTimeLogList from "./MyTimeLogList";
import TopHeader from "../../components/TopHeader";
import SearchDateRange from "../../components/SearchDateRange";

const MyTimeLogNew = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      
      <TopHeader
        title="Time Log"
        btn="Save"
        path="/myTimeLog/myTimeLog/add"
      />
     
      
      <SearchDateRange action={setDataForm} />
      {dataForm && <MyTimeLogList dataForm={dataForm} />}
    </div>
  );
};

export default MyTimeLogNew;
