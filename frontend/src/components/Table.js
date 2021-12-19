import { formatDate, RIGHT_ALIGNMENT } from '@elastic/eui';
import React, { useState, Fragment } from 'react';

import { createDataStore } from './dataStore';

import {
    EuiBasicTable,
    EuiButtonIcon,
    EuiHealth,
    EuiButton,
    EuiDescriptionList,
    EuiScreenReaderOnly,
} from '@elastic/eui';

import uniqBy from 'lodash/uniqBy';

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



export const Table = ({ items = [] }) => {
    const store = createDataStore(items);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [sortField, setSortField] = useState('invoiceNo');
    const [sortDirection, setSortDirection] = useState('asc');
    const [selectedItems, setSelectedItems] = useState([]);
    const [itemIdToExpandedRowMap, setItemIdToExpandedRowMap] = useState({});

    const onTableChange = ({ page = {}, sort = {} }) => {
        const { index: pageIndex, size: pageSize } = page;

        const { field: sortField, direction: sortDirection } = sort;

        setPageIndex(pageIndex);
        setPageSize(pageSize);
        setSortField(sortField);
        setSortDirection(sortDirection);
    };

    const onSelectionChange = (selectedItems) => {
        setSelectedItems(selectedItems);
    };

    const onClickDelete = () => {
        // store.deleteUsers(...selectedItems.map((user) => user.id));

        setSelectedItems([]);
    };

    const renderDeleteButton = () => {
        if (selectedItems.length === 0) {
            return;
        }
        return (
            <EuiButton color="danger" iconType="trash" onClick={onClickDelete}>
                Delete {selectedItems.length} Invoices
            </EuiButton>
        );
    };

    const toggleDetails = (item) => {
        const itemIdToExpandedRowMapValues = { ...itemIdToExpandedRowMap };
        if (itemIdToExpandedRowMapValues[item.id]) {
            delete itemIdToExpandedRowMapValues[item.id];
        } else {
            const { listOfPurchases = [] } = item;
            // const color = online ? 'success' : 'danger';
            // const label = online ? 'Online' : 'Offline';

            itemIdToExpandedRowMapValues[item.id] = listOfPurchases.map(({ quantity, price, total, gasTypeName, productCode }) => {
                const listItems = [
                    {
                        title: 'gas Name',
                        description: gasTypeName,
                    },
                    {
                        title: 'Quantity',
                        description: quantity,
                    },
                    {
                        title: 'Price',
                        description: price,
                    },
                    {
                        title: 'Total',
                        description: total,
                    },
                ];
                return <EuiDescriptionList listItems={listItems} />
            })

        }
        setItemIdToExpandedRowMap(itemIdToExpandedRowMapValues);
    };

    const { pageOfItems, totalItemCount } = store.findUsers(
        pageIndex,
        pageSize,
        sortField,
        sortDirection
    );

    const deleteButton = renderDeleteButton();

    const columns2 = [
        {
            field: 'firstName',
            name: 'First Name',
            sortable: true,
            truncateText: true,
            mobileOptions: {
                render: (item) => (
                    <span>
                        {item.firstName} {item.lastName}
                    </span>
                ),
                header: false,
                truncateText: false,
                enlarge: true,
                width: '100%',
            },
        },
        {
            field: 'lastName',
            name: 'Last Name',
            truncateText: true,
            mobileOptions: {
                show: false,
            },
        },
        {
            field: 'dateOfBirth',
            name: 'Date of Birth',
            schema: 'date',
            render: (date) => formatDate(date, 'dobLong'),
            sortable: true,
        },
        {
            name: 'Actions',
            actions: [
                {
                    name: 'Clone',
                    description: 'Clone this person',
                    type: 'icon',
                    icon: 'copy',
                    onClick: () => '',
                },
            ],
        },
        {
            align: RIGHT_ALIGNMENT,
            width: '40px',
            isExpander: true,
            name: (
                <EuiScreenReaderOnly>
                    <span>Expand rows</span>
                </EuiScreenReaderOnly>
            ),
            render: (item) => (
                <EuiButtonIcon
                    onClick={() => toggleDetails(item)}
                    aria-label={itemIdToExpandedRowMap[item.id] ? 'Collapse' : 'Expand'}
                    iconType={itemIdToExpandedRowMap[item.id] ? 'arrowUp' : 'arrowDown'}
                />
            ),
        },
    ];

    const columns = [
        {
            field: 'invoiceNo',
            name: 'Invoice Number',
            sortable: true,
            truncateText: true,
            mobileOptions: {
                render: (item) => (
                    <span>

                    </span>
                ),
                header: false,
                truncateText: false,
                enlarge: true,
                width: '100%',
            },
        }, {
            field: 'invoiceDateTime',
            name: 'Invoice Date',
            schema: 'date',
            render: (date) => formatDate(date, 'dobLong'),
            sortable: true,
        },
        {
            field: 'soldTo',
            name: 'Company',
            truncateText: true,
            mobileOptions: {
                show: false,
            },
            footer: ({ items }) => (
                <span>{uniqBy(items, 'soldTo').length} Companies</span>
            ),
        },
        {
            field: 'to',
            name: 'Address',
            truncateText: true,
            mobileOptions: {
                show: false,
            },
            footer: ({ items }) => (
                <span>{uniqBy(items, 'to').length} Places</span>
            ),
        },

        {
            field: 'totalAmount',
            name: 'Amount',
            truncateText: true,
            mobileOptions: {
                show: false,
            },
        },
        {
            name: 'Actions',
            actions: [
                {
                    name: 'Download',
                    description: 'Download Pdf',
                    type: 'icon',
                    icon: 'copy',
                    onClick: () => '',
                },
                {
                    name: 'Delete',
                    description: 'Delete Entry',
                    type: 'icon',
                    icon: 'copy',
                    onClick: () => '',
                },
            ],
        },
        {
            align: RIGHT_ALIGNMENT,
            width: '40px',
            isExpander: true,
            name: (
                <EuiScreenReaderOnly>
                    <span>Expand rows</span>
                </EuiScreenReaderOnly>
            ),
            render: (item) => (
                <EuiButtonIcon
                    onClick={() => toggleDetails(item)}
                    aria-label={itemIdToExpandedRowMap[item.id] ? 'Collapse' : 'Expand'}
                    iconType={itemIdToExpandedRowMap[item.id] ? 'arrowUp' : 'arrowDown'}
                />
            ),
        },
    ];

    const pagination = {
        pageIndex: pageIndex,
        pageSize: pageSize,
        totalItemCount: totalItemCount,
        pageSizeOptions: [3, 5, 8],
    };

    const sorting = {
        sort: {
            field: sortField,
            direction: sortDirection,
        },
        enableAllColumns: true
    };

    const selection = {
        selectable: (user) => user.online,
        selectableMessage: (selectable) =>
            !selectable ? 'User is currently offline' : undefined,
        onSelectionChange: onSelectionChange,
    };

    return (
        <Fragment>
            {deleteButton}
            <EuiBasicTable
                tableCaption="Demo of EuiBasicTable with expanding rows"
                items={pageOfItems}
                itemId="id"
                itemIdToExpandedRowMap={itemIdToExpandedRowMap}
                isExpandable={true}
                hasActions={true}
                columns={columns}
                pagination={pagination}
                sorting={sorting}
                isSelectable={true}
                selection={selection}
                onChange={onTableChange}
            />
        </Fragment>
    );
};