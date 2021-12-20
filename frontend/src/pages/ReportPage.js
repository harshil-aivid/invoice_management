import React, { Component } from 'react';
import DataGrid from '../components/DataGrid';
import { Table } from '../components/Table';
import AxiosConfig from "../context/axiosConfig";

class HistoryPage extends Component {
    state = { listOfInvoices: [] }
    componentDidMount() {
        this.fetchAllInvoices()
    }
    fetchAllInvoices = async () => {
        const { data } = await AxiosConfig.post("/v1/invoice/get-all-invoices").catch(e => []);
        this.setState({ listOfInvoices: data })
    }
    render() {
        const { listOfInvoices } = this.state;
        return (
            <div>
                <Table items={listOfInvoices} />
                <DataGrid items={listOfInvoices} />
            </div>
        );
    }
}

export default HistoryPage;