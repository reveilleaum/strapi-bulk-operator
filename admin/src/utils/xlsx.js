const XLSX = require("xlsx");

export const excelToJson = (file, action) => {
  const reader = new FileReader();
  reader.readAsBinaryString(file);
  reader.onload = (e) => {
    const data = e.target.result;
    const workbook = XLSX.read(data, {
      type: "binary",
    });
    workbook.SheetNames.forEach((sheet) => {
      const rowObject = XLSX.utils.sheet_to_row_object_array(
        workbook.Sheets[sheet]
      );
      action(rowObject);
    });
  };
};

export const jsonToExcel = (name, data) => {
  const filename = `${name}_export.xlsx`;
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "entries");
  XLSX.writeFile(wb, filename);
};
