/** @format */

import React, { useState, useMemo, useEffect } from "react";
import {
  getContentTypes,
  createEntries,
  updateEntries,
  exportEntries,
} from "../../services/apiCalls";
import pluginPkg from "../../../../package.json";
import { excelToJson, jsonToExcel } from "../../utils/xlsx";
import "../../style/variables.css";
import "../../style/global.css";

import RadioBtn from "../../components/RadioBtn";
import SelectBtn from "../../components/SelectBtn";
import UploadBtn from "../../components/UploadBtn";
import Button from "../../components/Button";
import ExcelIcon from "../../components/ExcelIcon";
import Alert from "../../components/Alert";
import Modal from "../../components/Modal";

const HomePage = () => {
  const darkMode = document
    .querySelector("style[data-styled='active']")
    .innerHTML.includes("body{background:#181826;}");
  const pageTitle = pluginPkg.strapi.displayName;

  const [collectionTypes, setCollectionTypes] = useState([]);
  const [selectedAction, setSelectedAction] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("");
  const [dataEntries, setDataEntries] = useState([]);
  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [errorLogs, setErrorLogs] = useState([]);
  const [modal, setModal] = useState(false);

  const titleClassName = useMemo(() => {
    return `main-title ${darkMode ? "dark-mode" : null}`;
  }, [darkMode]);

  const contentClassName = useMemo(() => {
    return `content ${darkMode ? "dark-mode" : null}`;
  }, [darkMode]);

  const containerClassName = useMemo(() => {
    return `container ${darkMode ? "dark-mode" : null}`;
  }, [darkMode]);

  const collectionsList = useMemo(() => {
    return collectionTypes.map((collection) => ({
      text: collection.info.displayName,
      value: collection.uid,
    }));
  }, [collectionTypes]);

  const convertFile = (file) => {
    excelToJson(file, setDataEntries);
  };

  const validForm = () => {
    if (!selectedAction) {
      setError("Choose an action");
      return false;
    }
    if (!selectedCollection) {
      setError("Choose a collection");
      return false;
    }
    if (!dataEntries.length && selectedAction !== "export") {
      setError("Upload an .xls of .xlsx file");
      return false;
    }
    setError("");
    return true;
  };

  const submit = () => {
    if (!validForm()) return false;

    setLoader(true);

    switch (selectedAction) {
      case "create":
        createEntries({
          query: selectedCollection.value,
          data: dataEntries,
        }).then((res) => {
          if (res.success) {
            setSuccess(res.success.message);
          }
          if (res.error) {
            setError(res.error.message);
            setErrorLogs(res.error.data);
            console.log(res.error.data);
          }
        });
        break;
      case "update":
        updateEntries({
          query: selectedCollection.value,
          data: dataEntries,
        }).then((res) => {
          console.log(res);
          if (res.success) {
            setSuccess(res.success.message);
          }
          if (res.error) {
            setError(res.error.message);
            setErrorLogs(res.error.data);
            console.log(res.error.data);
          }
        });
        break;
      case "export":
        exportEntries({
          query: selectedCollection.value,
        }).then((res) => {
          const collectionName = `${selectedCollection.value.split(".")[1]}s`;
          jsonToExcel(collectionName, res.data);
        });
    }

    setLoader(false);
  };

  useEffect(() => {
    getContentTypes().then((res) => {
      const collections = Object.keys(res.data).filter((key) => {
        if (!res.data[key].plugin && res.data[key].kind === "collectionType") {
          setCollectionTypes((init) => [...init, res.data[key]]);
          return true;
        }
      });
      if (!collections.length) setModal(true);
    });
  }, []);

  return (
    <div>
      <h1 className={titleClassName}>{pageTitle}</h1>
      <div className={contentClassName}>
        <div className={containerClassName}>
          <RadioBtn
            title="Choose an action :"
            items={[
              { text: "Export", value: "export" },
              { text: "Create", value: "create" },
              { text: "Update", value: "update" },
            ]}
            selected={selectedAction}
            select={setSelectedAction}
            darkMode={darkMode}
          />
          <SelectBtn
            title="Choose a collection :"
            items={collectionsList}
            selected={selectedCollection}
            select={setSelectedCollection}
            defaultValue="Select collection"
            darkMode={darkMode}
          />
          <UploadBtn
            title="Upload Excel file :"
            action={convertFile}
            disabled={selectedAction === "export"}
            darkMode={darkMode}
          >
            <ExcelIcon darkMode={darkMode} />
          </UploadBtn>
          <Button
            click={submit}
            loading={loader}
            text="Submit"
            darkMode={darkMode}
          />
          {(success || error) && (
            <Alert>
              {success && <p className="success">{success}</p>}
              {error && <p className="error">{error}</p>}
              {errorLogs.length ? (
                <a
                  className="logs"
                  onClick={() => jsonToExcel("errors", errorLogs)}
                >
                  Download errors
                </a>
              ) : null}
            </Alert>
          )}
          {modal && (
            <Modal>
              <p>You must have one collection type created at least</p>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
