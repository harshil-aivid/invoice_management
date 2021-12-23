import {
  EuiButtonIcon,
  EuiDescriptionList,
  EuiScreenReaderOnly,
  formatDate,
  RIGHT_ALIGNMENT,
} from "@elastic/eui";
import React, { useState, Fragment, useRef, useEffect } from "react";

import uniqBy from "lodash/uniqBy";
import {
  EuiLink,
  EuiHealth,
  EuiButton,
  EuiInMemoryTable,
  EuiEmptyPrompt,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
} from "@elastic/eui";

import AxiosConfig from "../../common/axiosConfig";

/*
Example user object:

{
  id: '1',
  firstName: 'john',
  lastName: 'doe',
  github: 'johndoe',
  dateOfBirth: Date.now(),
  nationality: 'NL',
  online: true
}

Example country object:

{
  code: 'NL',
  name: 'Netherlands',
  flag: '🇳🇱'
}
*/

const FAKE_ENTRY = [
  {
    listOfPurchases: [
      {
        quantity: 7119,
        price: 2.2485,
        total: 16007.07,
        _id: "61c17ce20646f07067dd4f7f",
        gasTypeName: "REGULAR",
        productCode: 121,
      },
      {
        quantity: 791,
        price: 2.804096,
        total: 2218.04,
        _id: "61c17ce20646f07067dd4f80",
        gasTypeName: "SUPER",
        productCode: 123,
      },
    ],
    invoiceNo: 1075371,
    invoiceDateTime: "2021-09-01T18:30:00.000Z",
    invoiceDateObj: {
      month: 9,
      date: 2,
      year: 2021,
      timestamp: 1630521000000,
    },
    dateTime: "2021-09-01T18:30:00.000Z",
    dateObj: {
      month: 9,
      date: 2,
      year: 2021,
      timestamp: 1630521000000,
    },
    profitCenter: 6,
    soldTo: "HARSHVADAN PATEL, SADHIMA INC",
    to: "3874 ST MARY'S RD",
    accountNo: 66040191,
    shipVia: "FLETCHER OIL CO",
    billNo: 156024958,
    totalAmount: 22600.77,
    storedAt:
      "public/pdfs/pdfs_pdfs_einv66040191_09022021_1075371.pdf_1637078502630.pdf_1640070370603.pdf",
    fileOriginalName:
      "pdfs_einv66040191_09022021_1075371.pdf_1637078502630.pdf",
    id: "61bf6a2ec545811b0cae986a",
  },
];

const noItemsFoundMsg = "No Invoices match search criteria";

const InMemoryTable = () => {
  const [loading, setLoading] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [message, setMessage] = useState(
    <EuiEmptyPrompt
      title={<h3>No Invoices</h3>}
      titleSize="xs"
      body="Looks like you don&rsquo;t have any invoices. Let&rsquo;s create some!"
      actions={
        <EuiButton
          size="s"
          key="loadInvoices"
          onClick={() => {
            loadInvoices();
          }}
        >
          Load Invoices
        </EuiButton>
      }
    />
  );

  const [selection, setSelection] = useState([]);
  const [error, setError] = useState();
  const [itemIdToExpandedRowMap, setItemIdToExpandedRowMap] = useState({});
  const tableRef = useRef();

  const loadInvoices = () => {
    setMessage("Loading Invoices...");
    setLoading(true);
    setInvoices([]);
    setError(undefined);
    AxiosConfig.post("/v1/invoice/get-all-invoices")
      .then(({ data }) => {
        setLoading(false);
        setMessage(noItemsFoundMsg);
        setError(undefined);
        setInvoices(data);
      })
      .catch((e) => {
        setLoading(false);
        setMessage(noItemsFoundMsg);
        setError("ouch!... again... ");
        setInvoices([]);
      });
  };

  const loadInvoicesWithError = () => {
    setMessage("Loading Invoices...");
    setLoading(true);
    setInvoices([]);
    setError(undefined);
    setTimeout(() => {
      invoices = [];
    }, 1);
  };
  const toggleDetails = (item) => {
    const itemIdToExpandedRowMapValues = { ...itemIdToExpandedRowMap };
    if (itemIdToExpandedRowMapValues[item.id]) {
      delete itemIdToExpandedRowMapValues[item.id];
    } else {
      const { listOfPurchases = [] } = item;
      // const color = online ? 'success' : 'danger';
      // const label = online ? 'Online' : 'Offline';

      itemIdToExpandedRowMapValues[item.id] = listOfPurchases.map(
        ({ quantity, price, total, gasTypeName, productCode }) => {
          const listItems = [
            {
              title: "gas Name",
              description: gasTypeName,
            },
            {
              title: "Quantity",
              description: quantity,
            },
            {
              title: "Price",
              description: price,
            },
            {
              title: "Total",
              description: total,
            },
          ];
          return <EuiDescriptionList listItems={listItems} />;
        }
      );
    }
    setItemIdToExpandedRowMap(itemIdToExpandedRowMapValues);
  };
  const renderToolsLeft = () => {
    if (selection.length === 0) {
      return;
    }

    const onClick = () => {
      // DELETE INVOICES HERE
      //   store.deleteUsers(...selection.map((user) => user.id));
      //   setSelection([]);
    };

    return (
      <EuiButton color="danger" iconType="trash" onClick={onClick}>
        Delete {selection.length} Invoices
      </EuiButton>
    );
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  const renderToolsRight = () => {
    return [
      <EuiButton
        key="loadInvoices"
        onClick={() => {
          loadInvoices();
        }}
        isDisabled={loading}
      >
        Load Invoices
      </EuiButton>,
    ];
  };

  //   const columns2 = [
  //     {
  //       field: "firstName",
  //       name: "First Name",
  //       sortable: true,
  //       truncateText: true,
  //     },
  //     {
  //       field: "lastName",
  //       name: "Last Name",
  //       truncateText: true,
  //     },
  //     {
  //       field: "github",
  //       name: "Github",
  //       render: (username) => (
  //         <EuiLink href={`https://github.com/${username}`} target="_blank">
  //           {username}
  //         </EuiLink>
  //       ),
  //     },
  //     {
  //       field: "dateOfBirth",
  //       name: "Date of Birth",
  //       dataType: "date",
  //       render: (date) => formatDate(date, "dobLong"),
  //       sortable: true,
  //     },
  //     {
  //       field: "nationality",
  //       name: "Nationality",
  //       render: (countryCode) => {
  //         const country = store.getCountry(countryCode);
  //         return `${country.flag} ${country.name}`;
  //       },
  //     },
  //     {
  //       field: "online",
  //       name: "Online",
  //       dataType: "boolean",
  //       render: (online) => {
  //         const color = online ? "success" : "danger";
  //         const label = online ? "Online" : "Offline";
  //         return <EuiHealth color={color}>{label}</EuiHealth>;
  //       },
  //       sortable: true,
  //     },
  //   ];

  const columns = [
    {
      field: "invoiceNo",
      name: "Invoice Number",
      sortable: true,
      truncateText: true,
      mobileOptions: {
        render: (item) => <span></span>,
        header: false,
        truncateText: false,
        enlarge: true,
        width: "100%",
      },
    },
    {
      field: "invoiceDateTime",
      name: "Invoice Date",
      schema: "date",
      render: (date) => formatDate(date, "dobLong"),
      sortable: true,
    },
    {
      field: "soldTo",
      name: "Company",
      truncateText: true,
      sortable: true,
      mobileOptions: {
        show: false,
      },
      footer: ({ items }) => (
        <span>{uniqBy(items, "soldTo").length} Companies</span>
      ),
    },
    {
      field: "to",
      name: "Address",
      truncateText: true,
      sortable: true,
      mobileOptions: {
        show: false,
      },
      footer: ({ items }) => <span>{uniqBy(items, "to").length} Places</span>,
    },

    {
      field: "totalAmount",
      name: "Amount",
      sortable: true,
      truncateText: true,
      mobileOptions: {
        show: false,
      },
    },
    {
      name: "Actions",
      actions: [
        {
          name: "Edit",
          description: "Edit Pdf",
          type: "icon",
          icon: "pencil",
          onClick: () => "",
        },
        {
          name: "View",
          description: "View Pdf",
          type: "icon",
          icon: "inspect",
          onClick: () => "",
        },
        {
          name: "Download",
          description: "Download Entry",
          type: "icon",
          icon: "download",
          onClick: () => "",
        },
        {
          name: "Delete",
          description: "Delete Entry",
          type: "icon",
          icon: "trash",
          onClick: () => "",
        },
      ],
    },
    {
      align: RIGHT_ALIGNMENT,
      width: "40px",
      isExpander: true,
      name: (
        <EuiScreenReaderOnly>
          <span>Expand rows</span>
        </EuiScreenReaderOnly>
      ),
      render: (item) => (
        <EuiButtonIcon
          onClick={() => toggleDetails(item)}
          aria-label={itemIdToExpandedRowMap[item.id] ? "Collapse" : "Expand"}
          iconType={itemIdToExpandedRowMap[item.id] ? "arrowUp" : "arrowDown"}
        />
      ),
    },
  ];
  const search = {
    toolsLeft: renderToolsLeft(),
    toolsRight: renderToolsRight(),
    box: {
      incremental: true,
    },
    filters: [
      {
        type: "field_value_selection",
        field: "to",
        name: "Address",
        multiSelect: true,
        options: uniqBy(invoices, "to").map((el) => ({
          value: el.to,
          name: el.to,
          view: el.to,
        })),
      },
      {
        type: "field_value_selection",
        field: "soldTo",
        name: "Company",
        multiSelect: true,
        options: uniqBy(invoices, "soldTo").map((el) => ({
          value: el.soldTo,
          name: el.soldTo,
          view: el.soldTo,
        })),
      },
    ],
  };

  const pagination = {
    initialPageSize: 5,
    pageSizeOptions: [3, 5, 8],
  };

  const selectionValue = {
    selectable: () => true,
    selectableMessage: () => undefined,
    onSelectionChange: (selection) => setSelection(selection),
    initialSelected: [],
  };

  return (
    <Fragment>
      <EuiSpacer size="l" />

      <EuiInMemoryTable
        tableCaption="Demo of EuiInMemoryTable with selection"
        ref={tableRef}
        items={invoices}
        itemIdToExpandedRowMap={itemIdToExpandedRowMap}
        itemId="id"
        error={error}
        loading={loading}
        message={message}
        columns={columns}
        search={search}
        pagination={pagination}
        sorting={true}
        selection={selectionValue}
        isSelectable={true}
      />
    </Fragment>
  );
};

export default InMemoryTable;
