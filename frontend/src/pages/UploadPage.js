
import React, { useState, Fragment } from 'react';


import {
    EuiFilePicker,
    EuiFlexGroup,
    EuiFlexItem,
    EuiText,
    EuiSpacer,
    EuiButton,
    EuiSwitch,
} from '@elastic/eui';
import JsonViewer from '../components/JsonViewer';
import AxiosConfig from "../context/axiosConfig";



export default () => {
    const [files, setFiles] = useState({});
    const [large, setLarge] = useState(true);
    const [jsonContent, setJsonContent] = useState({
        name: "Harshil",
        sName: "Patel",
        nickName: "Badshah",
        work: "Legendness"
    })
    const onChange = (files) => {
        setFiles(files.length > 0 ? Array.from(files) : []);
    };

    const renderFiles = () => {
        if (files.length > 0) {
            return (
                <ul>
                    {files.map((file, i) => (
                        <li key={i}>
                            <strong>{file.name}</strong> ({file.size} bytes)
                        </li>
                    ))}
                </ul>
            );
        } else {
            return (
                <p>Add some files to see a demo of retrieving from the FileList</p>
            );
        }
    };

    const uploadPdfs = async () => {
        const formData = new FormData();
        formData.append('File', files);
        const resp = await AxiosConfig.post('/api/uploadBills', formData);
    }

    return (
        <div className="w-full">
            <EuiFlexGroup >
                <EuiFlexItem grow={1}>
                    <EuiFlexGroup direction="column">
                        <EuiFlexItem grow={1} >
                            {/* DisplayToggles wrapper for Docs only */}
                            <EuiFilePicker
                                fullWidth
                                className="h-full"
                                id="asdf2"
                                multiple
                                initialPromptText="Select or drag and drop multiple files"
                                onChange={onChange}
                                display={large ? 'large' : 'default'}
                                aria-label="Use aria labels when no actual label is in use"
                            />
                            <EuiSpacer />
                        </EuiFlexItem>
                        <EuiFlexItem grow={1}>
                            <EuiText>
                                <h5>Files attached</h5>
                                {renderFiles()}
                            </EuiText>
                        </EuiFlexItem>
                    </EuiFlexGroup>
                </EuiFlexItem>
                <EuiFlexItem className="min-w-300" grow={1} >
                    <JsonViewer jsonContent={JSON.stringify(jsonContent, null, 4)} />
                </EuiFlexItem>
            </EuiFlexGroup>
            <EuiFlexGroup>
                <EuiFlexItem grow={true}>
                    <EuiButton fullWidth iconType="lensApp" onClick={() => uploadPdfs()}>
                        Upload
                    </EuiButton>
                </EuiFlexItem>
            </EuiFlexGroup>
        </div>
    );
};