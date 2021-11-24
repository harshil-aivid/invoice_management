import { EuiBadge, EuiIcon, EuiAvatar } from '@elastic/eui';
import React, { useState } from 'react';

/**
 * Docs note: Consuming apps should import the theme via the export json file
 * import theme from '@elastic/eui/dist/eui_theme_light.json';
 */

import {
    EuiHeader,
    EuiHeaderLogo,
    EuiHeaderLinks,
    EuiHeaderLink,
    EuiHeaderSectionItemButton,
} from '@elastic/eui';
import { Link } from 'react-router-dom';
const routerUrls = [
    {
        iconType: "addDataApp",
        urlPath: "/upload",
        label: "Upload Invoice"
    },
    {
        iconType: "reportingApp",
        urlPath: "/report",
        label: "Report"
    }

]

export default ({ theme }) => {
    const [noThing, setNoThing] = useState(true)
    const rerender = () => {

        setNoThing(!noThing);
    }
    return (
        <EuiHeader
            theme="dark"
            sections={[
                {
                    items: [
                        <EuiHeaderLogo>Lagrange BP Gas</EuiHeaderLogo>,
                        <EuiHeaderLinks aria-label="App navigation dark theme example">
                            {routerUrls.map(({ label, iconType, urlPath }) =>
                                (<EuiHeaderLink iconType={iconType} isActive={window.location.pathname === urlPath} ><Link to={urlPath} className="clear-all-css" onClick={() => rerender()}>{label}</Link></EuiHeaderLink>))}
                        </EuiHeaderLinks >,
                    ],
                    borders: 'right',
                },
                {
                    items: [
                        // <EuiBadge
                        //     // color={theme.euiColorDarkestShade.rgba}
                        //     iconType="arrowDown"
                        //     iconSide="right"
                        // >
                        //     Production logs
                        // </EuiBadge>,
                        // <EuiHeaderSectionItemButton
                        //     aria-label="2 Notifications"
                        //     notification={'2'}
                        // >
                        //     <EuiIcon type="cheer" size="m" />
                        // </EuiHeaderSectionItemButton>,
                        <EuiHeaderSectionItemButton aria-label="Account menu">
                            <EuiAvatar name="Harshavadan Patel" size="s" />
                        </EuiHeaderSectionItemButton>,
                    ],
                    borders: 'none',
                },
            ]}
        />
    )
};