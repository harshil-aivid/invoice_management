import React, { useState, Fragment } from "react";

import {
  EuiFilePicker,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiSpacer,
  EuiButton,
  EuiSwitch,
} from "@elastic/eui";
import JsonViewer from "../../components/JsonViewer/JsonViewer";
import AxiosConfig from "../../common/axiosConfig";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

// Register the plugin
registerPlugin(FilePondPluginFileValidateType);

export default () => {
  const [files, setFiles] = useState([]);
  const [jsonContent, setJsonContent] = useState({
    name: "Harshil",
    sName: "Patel",
    nickName: "Badshah",
    work: "Legendness",
  });

  const uploadPdfs = async () => {
    console.log("FIles : ", files);

    const formData = new FormData();
    files.forEach(({ file }) => formData.append("pdfs", file));
    const resp = await AxiosConfig.post(
      "/v1/invoice/upload-invoices",
      formData
    );
    setJsonContent(resp.data);
    // const resp1 = await AxiosConfig.get("/api/");
  };

  return (
    <div className="w-full">
      <EuiFlexGroup>
        <EuiFlexItem grow={1}>
          <FilePond
            allowMultiple={true}
            files={files}
            onupdatefiles={setFiles}
            acceptedFileTypes={["application/pdf"]}
          />
        </EuiFlexItem>
        <EuiFlexItem className="min-w-300" grow={1}>
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
