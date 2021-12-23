import React, { useState } from "react";
import find from "lodash/find";
import findIndex from "lodash/findIndex";
import "@elastic/charts/dist/theme_light.css";
import {
  EuiCollapsibleNav,
  EuiCollapsibleNavGroup,
  EuiHeaderSectionItemButton,
  EuiHeaderLogo,
  EuiHeader,
  EuiIcon,
  EuiButton,
  EuiButtonEmpty,
  EuiPageTemplate,
  EuiPinnableListGroup,
  EuiPinnableListGroupItemProps,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiImage,
  EuiListGroup,
  useGeneratedHtmlId,
  EuiAvatar,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiSpacer,
} from "@elastic/eui";

import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import SearchTablePage from "../pages/reports/SearchTablePage";
import DataGridPage from "../pages/reports/DataGridPage";
import ChartPage from "../pages/reports/ChartPage";
import ExtractionPage from "../pages/manage/ExtractionPage";
import TemplatePage from "../pages/manage/TemplatePage";
import TaxesPage from "../pages/manage/TaxesPage";

import "./main.css";
import UploadInvoicePage from "../pages/manage/UploadInvoicePage";

// import contentSvg from '../../images/content.svg';
// import { useExitPath } from '../../services/routing/routing';

const TopLinks = [
  {
    label: "Home",
    iconType: "home",
    isActive: true,
    "aria-current": true,
    onClick: () => {},
    pinnable: false,
  },
];

const CollapsibleNavAll = (props) => {
  // const exitPath = useExitPath();
  const history = useHistory();

  const [navIsOpen, setNavIsOpen] = useState(false);
  const redirectTo = (path) => {
    history.push(path);
    setNavIsOpen(false);
  };
  const ReportLinks = [
    {
      label: "Search Table",
      onClick: () => {
        redirectTo("/reports/search-table");
      },
    },
    {
      label: "Data Grid",
      onClick: () => {
        redirectTo("/reports/data-grid");
      },
    },
    {
      label: "Charts",
      onClick: () => {
        redirectTo("/reports/charts");
      },
    },
  ];

  const ManagementLinks = [
    {
      label: "Extraction Test",
      onClick: () => {
        redirectTo("/manage/extraction");
      },
    },
    {
      label: "Set Template",
      onClick: () => {
        redirectTo("/manage/template");
      },
    },
    {
      label: "Taxes",
      onClick: () => {
        redirectTo("/manage/taxes");
      },
    },
  ];

  const LearnLinks = [
    { label: "Docs", onClick: () => {} },
    { label: "Blogs", onClick: () => {} },
    { label: "Webinars", onClick: () => {} },
    { label: "Elastic.co", href: "https://elastic.co" },
  ];
  /**
   * Accordion toggling
   */
  const [openGroups, setOpenGroups] = useState(
    JSON.parse(String(localStorage.getItem("openNavGroups"))) || [
      "Report",
      "Management",
      "Learn",
    ]
  );

  // Save which groups are open and which are not with state and local store
  const toggleAccordion = (isOpen, title) => {
    if (!title) return;
    const itExists = openGroups.includes(title);
    if (isOpen) {
      if (itExists) return;
      openGroups.push(title);
    } else {
      const index = openGroups.indexOf(title);
      if (index > -1) {
        openGroups.splice(index, 1);
      }
    }
    setOpenGroups([...openGroups]);
    localStorage.setItem("openNavGroups", JSON.stringify(openGroups));
  };

  /**
   * Pinning
   */
  const [pinnedItems, setPinnedItems] = useState(
    JSON.parse(String(localStorage.getItem("pinnedItems"))) || []
  );

  const addPin = (item) => {
    if (!item || find(pinnedItems, { label: item.label })) {
      return;
    }
    item.pinned = true;
    const newPinnedItems = pinnedItems ? pinnedItems.concat(item) : [item];
    setPinnedItems(newPinnedItems);
    localStorage.setItem("pinnedItems", JSON.stringify(newPinnedItems));
  };

  const removePin = (item) => {
    const pinIndex = findIndex(pinnedItems, { label: item.label });
    if (pinIndex > -1) {
      item.pinned = false;
      const newPinnedItems = pinnedItems;
      newPinnedItems.splice(pinIndex, 1);
      setPinnedItems([...newPinnedItems]);
      localStorage.setItem("pinnedItems", JSON.stringify(newPinnedItems));
    }
  };

  function alterLinksWithCurrentState(links, showPinned = false) {
    return links.map((link) => {
      const { pinned, ...rest } = link;
      return {
        pinned: showPinned ? pinned : false,
        ...rest,
      };
    });
  }

  function addLinkNameToPinTitle(listItem) {
    return `Pin ${listItem.label} to top`;
  }

  function addLinkNameToUnpinTitle(listItem) {
    return `Unpin ${listItem.label}`;
  }

  const collapsibleNavId = useGeneratedHtmlId({ prefix: "collapsibleNav" });

  const collapsibleNav = (
    <EuiCollapsibleNav
      id={collapsibleNavId}
      aria-label="Main navigation"
      isOpen={navIsOpen}
      button={
        <EuiHeaderSectionItemButton
          aria-label="Toggle main navigation"
          onClick={() => setNavIsOpen(!navIsOpen)}
        >
          <EuiIcon type={"menu"} size="m" aria-hidden="true" />
        </EuiHeaderSectionItemButton>
      }
      onClose={() => setNavIsOpen(false)}
    >
      {/* Dark deployments section */}
      {/* <EuiFlexItem grow={false} style={{ flexShrink: 0 }}>
        <EuiCollapsibleNavGroup isCollapsible={false} background="dark">
          <EuiListGroup
            color="ghost"
            maxWidth="none"
            gutterSize="none"
            size="s"
            listItems={[
              {
                label: "Manage deployment",
                href: "#",
                iconType: "logoCloud",
                iconProps: {
                  color: "ghost",
                },
              },
            ]}
          />
        </EuiCollapsibleNavGroup>
      </EuiFlexItem> */}

      {/* Shaded pinned section always with a home item */}
      <EuiFlexItem grow={false} style={{ flexShrink: 0 }}>
        <EuiCollapsibleNavGroup
          background="light"
          className="eui-yScroll"
          style={{ maxHeight: "40vh" }}
        >
          <EuiPinnableListGroup
            aria-label="Pinned links" // A11y : Since this group doesn't have a visible `title` it should be provided an accessible description
            listItems={alterLinksWithCurrentState(TopLinks).concat(
              alterLinksWithCurrentState(pinnedItems, true)
            )}
            unpinTitle={addLinkNameToUnpinTitle}
            onPinClick={removePin}
            maxWidth="none"
            color="text"
            gutterSize="none"
            size="s"
          />
        </EuiCollapsibleNavGroup>
      </EuiFlexItem>

      <EuiHorizontalRule margin="none" />

      {/* BOTTOM */}
      <EuiFlexItem className="eui-yScroll">
        {/* Report section */}
        <EuiCollapsibleNavGroup
          title={
            <a
              className="eui-textInheritColor"
              href="#/navigation/collapsible-nav"
              onClick={(e) => e.stopPropagation()}
              // to="/configure"
            >
              Reports
            </a>
          }
          iconType="reportingApp"
          isCollapsible={true}
          initialIsOpen={openGroups.includes("Report")}
          onToggle={(isOpen) => toggleAccordion(isOpen, "Report")}
        >
          <EuiPinnableListGroup
            aria-label="Report" // A11y : EuiCollapsibleNavGroup can't correctly pass the `title` as the `aria-label` to the right HTML element, so it must be added manually
            listItems={alterLinksWithCurrentState(ReportLinks)}
            pinTitle={addLinkNameToPinTitle}
            onPinClick={addPin}
            maxWidth="none"
            color="subdued"
            gutterSize="none"
            size="s"
          />
        </EuiCollapsibleNavGroup>
        <EuiCollapsibleNavGroup
          title={
            <a
              className="eui-textInheritColor"
              href="#/navigation/collapsible-nav"
              onClick={(e) => e.stopPropagation()}
            >
              Management
            </a>
          }
          iconType="managementApp"
          isCollapsible={true}
          initialIsOpen={openGroups.includes("Management")}
          onToggle={(isOpen) => toggleAccordion(isOpen, "Management")}
        >
          <EuiPinnableListGroup
            aria-label="Management" // A11y : EuiCollapsibleNavGroup can't correctly pass the `title` as the `aria-label` to the right HTML element, so it must be added manually
            listItems={alterLinksWithCurrentState(ManagementLinks)}
            pinTitle={addLinkNameToPinTitle}
            onPinClick={addPin}
            maxWidth="none"
            color="subdued"
            gutterSize="none"
            size="s"
          />
        </EuiCollapsibleNavGroup>

        {/* Learn section */}
        <EuiCollapsibleNavGroup
          title={
            <a
              className="eui-textInheritColor"
              onClick={(e) => e.stopPropagation()}
            >
              Training
            </a>
          }
          iconType="training"
          isCollapsible={true}
          initialIsOpen={openGroups.includes("Learn")}
          onToggle={(isOpen) => toggleAccordion(isOpen, "Learn")}
        >
          <EuiPinnableListGroup
            aria-label="Learn" // A11y : EuiCollapsibleNavGroup can't correctly pass the `title` as the `aria-label` to the right HTML element, so it must be added manually
            listItems={alterLinksWithCurrentState(LearnLinks)}
            pinTitle={addLinkNameToPinTitle}
            onPinClick={addPin}
            maxWidth="none"
            color="subdued"
            gutterSize="none"
            size="s"
          />
        </EuiCollapsibleNavGroup>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        {/* Span fakes the nav group into not being the first item and therefore adding a top border */}
        <span />
        <EuiCollapsibleNavGroup>
          <EuiButton
            fill
            fullWidth
            iconType="plusInCircleFilled"
            onClick={() => redirectTo("/manage/upload")}
          >
            Add Invoice
          </EuiButton>
        </EuiCollapsibleNavGroup>
      </EuiFlexItem>
    </EuiCollapsibleNav>
  );

  const leftSectionItems = [
    collapsibleNav,
    <EuiHeaderLogo iconType="notebookApp">Lagrange BP Gas</EuiHeaderLogo>,
  ];

  return (
    <>
      <EuiHeader
        position="fixed"
        sections={[
          {
            items: leftSectionItems,
            borders: "right",
          },
          {
            items: [
              <EuiHeaderSectionItemButton aria-label="Account menu">
                <EuiAvatar name="Harshavadan Patel" size="s" />
              </EuiHeaderSectionItemButton>,
            ],
          },
        ]}
      />

      {/* <EuiPageTemplate template="centeredBody">
          <Switch>
            <Route path="/report" component={ReportPage} />
            <Route path="/upload" component={UploadPage} />
            <Route path="/login" component={LoginPage} />
            <Redirect to="/login" />
          </Switch>
        </EuiPageTemplate> */}

      <EuiPage paddingSize="none" className="container mt-2">
        <EuiPageBody paddingSize="l">
          <EuiPageContent
            verticalPosition="center"
            horizontalPosition="center"
            className="w-full"
            // paddingSize="none"
          >
            <Switch>
              <Route path="/reports/search-table" component={SearchTablePage} />
              <Route path="/reports/data-grid" component={DataGridPage} />
              <Route path="/reports/charts" component={ChartPage} />
              <Route path="/manage/upload" component={UploadInvoicePage} />
              <Route path="/manage/extraction" component={ExtractionPage} />
              <Route path="/manage/template" component={TemplatePage} />
              <Route path="/manage/taxes" component={TaxesPage} />
              <Redirect to="/reports/search-table" />
            </Switch>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    </>
  );
};

export default CollapsibleNavAll;
