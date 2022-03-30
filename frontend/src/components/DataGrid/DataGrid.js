import { EuiDataGrid, EuiLink } from '@elastic/eui';
import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { fake } from 'faker';

const columns = [
    {
        id: 'invoiceNo',
    },
    {
        id: 'invoiceDateTime',
    },
    {
        id: 'soldTo',
    },
    {
        id: 'to',
    },
    {
        id: 'totalAmount',
    },

];


const raw_data = [];

for (let i = 1; i < 100; i++) {
    raw_data.push({
        name: fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
        email: <EuiLink href="">{fake('{{internet.email}}')}</EuiLink>,
        location: (
            <Fragment>
                {`${fake('{{address.city}}')}, `}
                <EuiLink href="https://google.com">
                    {fake('{{address.country}}')}
                </EuiLink>
            </Fragment>
        ),
        date: fake('{{date.past}}'),
        account: fake('{{finance.account}}'),
        amount: fake('${{commerce.price}}'),
        phone: fake('{{phone.phoneNumber}}'),
        version: fake('{{system.semver}}'),
    });
}
const items = [
    {
        "listOfPurchases": [
            {
                "quantity": 7119,
                "price": 2.2485,
                "total": 16007.07,
                "_id": "61bf6a3cc545811b0cae986f",
                "gasTypeName": "REGULAR",
                "productCode": 121
            },
            {
                "quantity": 791,
                "price": 2.804096,
                "total": 2218.04,
                "_id": "61bf6a3cc545811b0cae9870",
                "gasTypeName": "SUPER",
                "productCode": 123
            }
        ],
        "invoiceNo": 1075371,
        "invoiceDateTime": "2021-09-01T18:30:00.000Z",
        "invoiceDateObj": {
            "month": 9,
            "date": 2,
            "year": 2021,
            "timestamp": 1630521000000
        },
        "dateTime": "2021-09-01T18:30:00.000Z",
        "dateObj": {
            "month": 9,
            "date": 2,
            "year": 2021,
            "timestamp": 1630521000000
        },
        "profitCenter": 6,
        "soldTo": "HARSHVADAN PATEL, SADHIMA INC",
        "to": "3874 ST MARY'S RD",
        "accountNo": 66040191,
        "shipVia": "FLETCHER OIL CO",
        "billNo": 156024958,
        "totalAmount": 22600.77,
        "storedAt": "public/pdfs/pdfs_einv66040191_09022021_1075371.pdf_1639934524010.pdf",
        "fileOriginalName": "einv66040191_09022021_1075371.pdf",
        "id": "61bf6a2ec545811b0cae986a"
    },
    {
        "listOfPurchases": [
            {
                "quantity": 6577,
                "price": 2.302401,
                "total": 15142.89,
                "_id": "61bf6d67a6b0e93396accd96",
                "gasTypeName": "REGULAR",
                "productCode": 121
            },
            {
                "quantity": 1085,
                "price": 2.876406,
                "total": 3120.9,
                "_id": "61bf6d67a6b0e93396accd97",
                "gasTypeName": "SUPER",
                "productCode": 123
            },
            {
                "quantity": 990,
                "price": 2.273202,
                "total": 2250.47,
                "_id": "61bf6d67a6b0e93396accd98",
                "gasTypeName": "DIESEL",
                "productCode": 211
            }
        ],
        "invoiceNo": 1075379,
        "invoiceDateTime": "2021-08-31T18:30:00.000Z",
        "invoiceDateObj": {
            "month": 9,
            "date": 1,
            "year": 2021,
            "timestamp": 1630434600000
        },
        "dateTime": "2021-08-31T18:30:00.000Z",
        "dateObj": {
            "month": 9,
            "date": 1,
            "year": 2021,
            "timestamp": 1630434600000
        },
        "profitCenter": 6,
        "soldTo": "MEEKAJAY INC",
        "to": "1499 LAFAYETTE PKWY",
        "accountNo": 12290185,
        "shipVia": "FLETCHER OIL CO",
        "billNo": 176068592,
        "totalAmount": 25399.25,
        "storedAt": "public/pdfs/pdfs_einv12290185_09022021_1075379.pdf_1639935335438.pdf",
        "fileOriginalName": "einv12290185_09022021_1075379.pdf",
        "id": "61bf6d67a6b0e93396accd95"
    }
]

export default ({ items = [] }) => {
    console.log(items)
    // ** Pagination config
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    const onChangeItemsPerPage = useCallback(
        (pageSize) =>
            setPagination((pagination) => ({
                ...pagination,
                pageSize,
                pageIndex: 0,
            })),
        [setPagination]
    );
    const onChangePage = useCallback(
        (pageIndex) =>
            setPagination((pagination) => ({ ...pagination, pageIndex })),
        [setPagination]
    );

    // ** Sorting config
    const [sortingColumns, setSortingColumns] = useState([]);
    const onSort = useCallback(
        (sortingColumns) => {
            setSortingColumns(sortingColumns);
        },
        [setSortingColumns]
    );

    // Column visibility
    const [visibleColumns, setVisibleColumns] = useState(() =>
        columns.map(({ id }) => id)
    ); // initialize to the full set of columns

    const renderCellValue = useMemo(() => {
        return ({ rowIndex, columnId }) => {
            return items.hasOwnProperty(rowIndex)
                ? items[rowIndex][columnId]
                : null;
        };
    }, [items]);

    return (
        <EuiDataGrid
            aria-label="inMemory level set to sorting data grid demo"
            columns={columns}
            columnVisibility={{ visibleColumns, setVisibleColumns }}
            rowCount={items.length}
            renderCellValue={renderCellValue}
            inMemory={{ level: 'sorting' }}
            sorting={{ columns: sortingColumns, onSort }}
            pagination={{
                ...pagination,
                pageSizeOptions: [10, 50, 100],
                onChangeItemsPerPage: onChangeItemsPerPage,
                onChangePage: onChangePage,
            }}
        />
    );
};