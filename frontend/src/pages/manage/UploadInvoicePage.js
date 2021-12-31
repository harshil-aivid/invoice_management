import React, { useState, Fragment, useContext } from "react";

import {
  EuiFilePicker,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiSpacer,
  EuiButton,
  EuiSwitch,
  EuiCallOut,
} from "@elastic/eui";
import JsonViewer from "../../components/JsonViewer/JsonViewer";
import AxiosConfig from "../../common/axiosConfig";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { GlobalContext } from "../../components/GlobalToast/GlobalContext";

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
  const { dispatchGlobalAction } = useContext(GlobalContext)
  const uploadPdfs = async () => {
    console.log("FIles : ", files);

    const formData = new FormData();
    files.forEach(({ file }) => formData.append("pdfs", file));
    const resp = await AxiosConfig.post(
      "/v1/invoice/upload-invoices",
      formData
    ).catch((error) => {
      dispatchGlobalAction("ADD_TOAST", { color: "danger", title: error.message, text: JSON.stringify(error), })

    });
    const erroredFiles = resp.data.filter(({ error }) => error)
    setJsonContent(resp.data);
    setFiles([])
    if (erroredFiles.length) {
      dispatchGlobalAction("ADD_TOAST", { color: "warning", title: "Pdf not parsed correctly", text: <p>{erroredFiles.map(({ fileName }) => fileName).join(" ")}</p>, })
    }
    else {

      dispatchGlobalAction("ADD_TOAST", { color: "success", title: "Succesfully Uploaded", text: <p>Thanks for your patience!</p>, })
    }

    // const resp1 = await AxiosConfig.get("/api/");
  };

  return (
    <div className="w-full">
      <EuiCallOut
        size="s"
        title="Note : You can upload multiple pdf files (upto 100 file per upload and Only supports Invoice PDFs : env*.pdf)"
        iconType="pin"
      />
      <EuiSpacer size="s" />
      <EuiFlexGroup>
        <EuiFlexItem grow={1} className="max-550">


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
