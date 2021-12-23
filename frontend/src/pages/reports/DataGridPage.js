import React, { useState, useEffect } from "react";
import DataGrid from "../../components/DataGrid/DataGrid";
import AxiosConfig from "../../common/axiosConfig";

const DataGridPage = () => {
  const [listOfInvoices, setListOfInvoices] = useState([]);
  const fetchAllInvoices = async () => {
    const { data } = await AxiosConfig.post(
      "/v1/invoice/get-all-invoices"
    ).catch((e) => []);
    setListOfInvoices(data);
  };
  useEffect(() => {
    fetchAllInvoices();
  }, []);

  return (
    <div>
      <DataGrid items={listOfInvoices} />
    </div>
  );
};

export default DataGridPage;
