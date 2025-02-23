import { useState } from "react";
import { usePapaParse } from "react-papaparse";
import { Card } from "@/components/ui/card";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "@/components/ui/table";

export default function View() {
  const [data, setData] = useState([]);
  const { readString } = usePapaParse();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ({ target: { result } }) => {
        readString(result, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => setData(results.data),
        });
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Card className="p-4 shadow-lg rounded-lg">
        <label className="block text-lg font-semibold mb-2">Upload CSV File</label>
        <input type="file" accept=".csv" onChange={handleFileUpload} className="block w-full border border-gray-300 rounded-md p-2 mb-4" />
      </Card>

      {data.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <Table className="w-full border border-gray-200 rounded-lg shadow-md">
            <TableHead className="bg-gray-100">
              <TableRow className="grid grid-cols-6 text-center"> 
                <TableHeader className="px-6 py-3 font-bold">ID</TableHeader>
                <TableHeader className="px-6 py-3 font-bold">Title</TableHeader>
                <TableHeader className="px-6 py-3 font-bold">Acceptance</TableHeader>
                <TableHeader className="px-6 py-3 font-bold">Difficulty</TableHeader>
                <TableHeader className="px-6 py-3 font-bold">Frequency</TableHeader>
                <TableHeader className="px-6 py-3 font-bold">Leetcode Link</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index} className="grid grid-cols-6 text-center border-b hover:bg-gray-50">
                  <TableCell className="px-6 py-3">{row.ID}</TableCell>
                  <TableCell className="px-6 py-3 font-semibold">{row.Title}</TableCell>
                  <TableCell className="px-6 py-3">{row.Acceptance}%</TableCell>
                  <TableCell className="px-6 py-3">{row.Difficulty}</TableCell>
                  <TableCell className="px-6 py-3 w-32 truncate">{parseFloat(row.Frequency).toFixed(2)}</TableCell>
                  <TableCell className="px-6 py-3">
                    <a href={row["Leetcode Question Link"]} target="_blank" className="text-blue-500 underline hover:text-blue-700">
                      Link
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
