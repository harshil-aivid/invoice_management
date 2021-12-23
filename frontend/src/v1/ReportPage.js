import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import DataGrid from "../components/DataGrid/DataGrid";
import { Table } from "../components/Table";
import AxiosConfig from "../common/axiosConfig";

const HistoryPage = () => {
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
      <Table items={listOfInvoices} />
      <DataGrid items={listOfInvoices} />
    </div>
  );
};

export default HistoryPage;
