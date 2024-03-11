/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useRouter } from "next/navigation";

//MUI
import { Checkbox, Pagination, TextField, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import StarIcon from '@mui/icons-material/Star';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import GetAppIcon from '@mui/icons-material/GetApp';

//atoms
import Button from "@/components/atoms/button";
import DeleteButton from "@/components/atoms/buttonDelete";

//types
import { Country } from "@/types/Country";

//utils
import { getCurrencyName } from "@/utils/currencyName";
import { isEqual } from "@/utils/helpers";
import { formatBillions } from "@/utils/formatBillions";
import { getLanguageOf } from "@/utils/languageOf";
import ExportButton from "@/components/atoms/buttonExport";

interface Props {
  data: Country[];
  showSaveButton?: boolean; 
  showDeleteButton?: boolean;
  showExportButton?: boolean;
}

const BasicTable: React.FC<Props> = ({ data, showSaveButton, showDeleteButton, showExportButton }) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState<Country[]>([]);
  const rowsPerPage = 10;
  const router = useRouter();

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleRowSelect = (selectedCountry: Country) => {
    if (isSelected(selectedCountry)) {
      setSelectedRows(selectedRows.filter((country) => country !== selectedCountry));
    } else {
      setSelectedRows([...selectedRows, selectedCountry]);
    }
  };

  const isSelected = (country: Country) => {
    return selectedRows.some((selectedCountry) => selectedCountry === country);
  };

  const filteredData = data.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleSaveToHistory = () => {
    const savedRowsString = localStorage.getItem("selectedRows");
    const savedRows: Country[] = savedRowsString ? JSON.parse(savedRowsString) : [];
    const updatedRows = [...savedRows, ...selectedRows];
    localStorage.setItem("selectedRows", JSON.stringify(updatedRows));
    alert("As informações selecionadas foram salvas no histórico!");
  };

  const handleDeleteFromHistory = () => {
    const savedRowsString = localStorage.getItem("selectedRows");
    let savedRows: Country[] = savedRowsString ? JSON.parse(savedRowsString) : [];
    savedRows = savedRows.filter(savedCountry => {
      return !selectedRows.some(selectedCountry =>
        isEqual(savedCountry, selectedCountry)
      );
    });
    localStorage.setItem("selectedRows", JSON.stringify(savedRows));
    alert("Os itens selecionados foram removidos do histórico!");
    router.push("/")
  };

  const handleExportCSV = () => {
    const savedRowsString = localStorage.getItem("selectedRows");
    const savedRows: Country[] = savedRowsString ? JSON.parse(savedRowsString) : [];
  
    const header = ["Name", "Capital", "Language", "Population", "Coin", "Continent"];
    const csvContent = [
      header.join(","),
      ...savedRows.map(country => [
        country.name.common,
        country.capital,
        getLanguageOf(country),
        formatBillions(country.population),
        getCurrencyName(country),
        country.continents.join(",")
      ].join(","))
    ].join("\n");
  
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = 'countries.csv';
    document.body.appendChild(link);
    link.click();
  
    setTimeout(() => {
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    }, 200);
  };
  
  return (
    <>
      <div className=" flex flex-row justify-between">
        <TextField
          label="Find a country"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{
            ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input" :{
              padding: '10px 10px',
              width: "400px",
              height: '30px',
              color: "#fff"
            },

            ".css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":{
              color:"#fff"
            },
            
            ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
              borderColor: "#fff"
            },
            ".css-1t812tu-MuiInputBase-input-MuiOutlinedInput-input:focus": {
              color:"#fff"
            }
          }}
        />
        
        <div className=" flex flex-row gap-3">
          { showDeleteButton && selectedRows.length > 0 && <DeleteButton onPress={handleDeleteFromHistory}>  <DeleteOutlineIcon /> Deletar item(s) histórico</DeleteButton> }
          { showExportButton && <ExportButton onPress={handleExportCSV}> <GetAppIcon /> exportar histórico em CSV</ExportButton> }
        </div>

        { showSaveButton && selectedRows.length > 0 && <Button onPress={handleSaveToHistory}> <StarIcon/> Salvar no histórico</Button> }
      </div>
      <TableContainer component={Paper} style={{ backgroundColor: "#16181A", marginTop: 20 }}>
        <Table>
          <TableHead style={{ backgroundColor: "#16181A" }}>
            <TableRow>
              <TableCell align="center" style={{ color:'#29E0A9', borderBottom: "1px solid #040507" }}></TableCell>
              <TableCell align="center" style={{ color:'#29E0A9', borderBottom: "1px solid #040507" }}>Name</TableCell>
              <TableCell align="center" style={{ color:'#29E0A9', borderBottom: "1px solid #040507" }}>Capital</TableCell>
              <TableCell align="center" style={{ color:'#29E0A9', borderBottom: "1px solid #040507" }}>Language</TableCell>
              <TableCell align="center" style={{ color:'#29E0A9', borderBottom: "1px solid #040507" }}>Population</TableCell>
              <TableCell align="center" style={{ color:'#29E0A9', borderBottom: "1px solid #040507" }}>Country Currency</TableCell>
              <TableCell align="center" style={{ color:'#29E0A9', borderBottom: "1px solid #040507" }}>Continent</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor:"#16181A" }}>
            {paginatedData.map((country, index) => (
              <TableRow key={index}>
                 <TableCell style={{ color:'#ffffff', borderBottom: "1px solid #040507" }}>
                  <Checkbox
                    style={{
                       color: '#fff' 
                    }}
                    checked={isSelected(country)}
                    onChange={() => handleRowSelect(country)}
                  />
                 </TableCell>
                <TableCell style={{ color:'#ffffff', borderBottom: "1px solid #040507" }}>
                  <Typography component="div" className="flex flex-row items-center gap-4">
                    <img src={country.flags.png} alt={country.flags.alt} className="w-10 h-8"  />
                    {country.name.official}
                  </Typography>
                </TableCell>
                <TableCell align="center" style={{ color:'#ffffff', borderBottom: "1px solid #040507", }}>{country.capital}</TableCell>
                <TableCell align="center" style={{ color:'#ffffff', borderBottom: "1px solid #040507" }}>{getLanguageOf(country)}</TableCell>
                <TableCell align="center" style={{ color:'#ffffff', borderBottom: "1px solid #040507" }}>{formatBillions(country.population)}</TableCell>
                <TableCell align="center" style={{ color:'#ffffff', borderBottom: "1px solid #040507" }}>{getCurrencyName(country)}</TableCell>
                <TableCell align="center" style={{ color:'#ffffff', borderBottom: "1px solid #040507" }}>{country.continents}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          count={Math.ceil(data.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          sx={{
              '& .MuiPaginationItem-root': {
                  color: '#ffffff',
              },
          }}
        />
      </TableContainer>
    </>
  );
};

export default BasicTable;
