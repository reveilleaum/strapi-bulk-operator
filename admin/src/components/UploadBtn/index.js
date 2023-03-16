import React, { useMemo, useState } from "react";
import "./style.css";

const UploadBtn = ({ children, title, action, disabled, darkMode }) => {
  const [fileUploaded, setFileUploaded] = useState("");

  const uploadFieldClassname = useMemo(() => {
    return `upload-field ${darkMode ? "dark-mode" : null}`;
  }, [darkMode]);

  const iconClassName = useMemo(() => {
    return `icon ${fileUploaded && "uploaded"}`;
  }, [fileUploaded]);

  const disabledUpload = useMemo(() => {
    return disabled ? "disabled" : null;
  }, [disabled]);

  const uploadFile = (e) => {
    const file = e.target.files[0];
    setFileUploaded(file.name);
    action(file);
  };

  return (
    <div className={disabledUpload}>
      <h3>{title}</h3>
      <div className={uploadFieldClassname}>
        <div className={iconClassName}>
          {children}
          {fileUploaded || "Upload your file"}
        </div>
        <input
          type="file"
          accept=".xls, .xlsx"
          onChange={(e) => uploadFile(e)}
        />
      </div>
    </div>
  );
};

export default UploadBtn;
