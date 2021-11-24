import { EuiCodeBlock } from '@elastic/eui';
import React from 'react';

export default ({ jsonContent = "" }) => (
    <div>
        <EuiCodeBlock language="json" overflowHeight={500} isCopyable isVirtualized>
            {jsonContent}
        </EuiCodeBlock>
    </div>
);