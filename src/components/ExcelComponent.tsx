import React from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

interface ExcelComponentProps {
  data: any[]; // Buraya hangi bileşende kullanılırsa o bileşenin veri yapısını verin
  sheetName: string;
  fileName: string;
}

const ExcelComponent: React.FC<ExcelComponentProps> = ({ data, sheetName, fileName }) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(excelBlob, `${fileName}.xlsx`);
  };

  return (
    <button className="btn btn-dark" onClick={exportToExcel}>
      Export to Excel
    </button>
  );
};

export default ExcelComponent;