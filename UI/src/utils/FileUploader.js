import React, { useState } from "react";
// import { axiosInstance } from "../utils/AxiosInstance";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";

const FileUploader = (props) => {
  const { selectFile = () => {}, apiCall = () => {} } = props;

  // const [selectedFile, setSelectedFile] = useState(null);
  // // On file select (from the pop up)
  // const onFileChange = event => {
  //   // Update the state
  //   setSelectedFile(event.target.files[0]);
  // };

  // // On file upload (click the upload button)
  // const onFileUpload = () => {
  //   // Create an object of formData
  //   const formData = new FormData();

  //   // Update the formData object
  //   formData.append("myFile", selectedFile, selectedFile.name);

  //   // Details of the uploaded file
  //   console.log(selectedFile);
  //   console.log(formData);

  //   // Request made to the backend api
  //   // Send formData object
  //   // axiosInstance.post("api/csvUpload", formData);
  // };

  // // File content to be displayed after
  // // file upload is complete
  // // const fileData = () => {
  // //   if (selectedFile) {
  // //     return (
  // //       <div>
  // //         <h2>File Details:</h2>

  // //         <p>File Name: {selectedFile.name}</p>

  // //         <p>File Type: {selectedFile.type}</p>

  // //         <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p>
  // //       </div>
  // //     );
  // //   } else {
  // //     return (
  // //       <div>
  // //         <br />
  // //         <h4>Choose before Pressing the Upload button</h4>
  // //       </div>
  // //     );
  // //   }
  // // };

  return (
    <span
      className="flex flex-row gap-3 items-center"
      style={{ paddingLeft: "15px", height: "55px", width: "363px" }}
    >
      {/* <h1 className="text-2xl">Upload file</h1> */}
      <input
        placeholder="Upload File"
        style={{
          height: "36px",
          width: "130px",
          backgroundColor: "#d1d1d1",
          border: "none",
          borderRadius: "4px",
          paddingLeft: "7px",
        }}
      ></input>
      <label onChange={selectFile} htmlFor="fileInput">
        <input id="fileInput" type="file" hidden />
        <span className="btn border-blue-500 cursor-pointer max-w-xs">
          Choose File
        </span>
      </label>
      <button
        className="btn bg-indigo-500 hover:bg-indigo-600 text-white max-w-xs"
        onClick={apiCall}
      >
        Submit
      </button>
      {/* {fileData} */}
    </span>
  );
};

export default FileUploader;
