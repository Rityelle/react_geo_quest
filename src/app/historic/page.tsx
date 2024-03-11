"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

//MUI
import TableRowsIcon from '@mui/icons-material/TableRows';
import GridViewIcon from '@mui/icons-material/GridView';

//types
import { Country } from "@/types/Country";

//atoms
import Button from "@/components/atoms/button";

//organisms
import Header from "@/components/organisms/Header";
import BasicTable from "@/components/organisms/Table";
import FlipCard from "@/components/organisms/Card";


const Historic: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<Country[]>([]);
  const [showTable, setShowTable] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    //get infos localStorage
    const savedRows = localStorage.getItem("selectedRows");
    if (savedRows) {
      setSelectedRows(JSON.parse(savedRows));
    }
  }, []);

  const handleBack = () => {
    //Back Home
    router.back();
  }

  const toggleView = () => {
    //toogleview that switches the view for the user
    setShowTable(!showTable);
  };

  return (
    <div>
      <Header title="- Historic" onPress={handleBack} />        
      <div className="flex justify-end mt-4 mr-20 gap-4">
        <Button onPress={toggleView}>
        {showTable ? (
            <>
              <GridViewIcon /> Show cards
            </>
          ):(
            <>
              <TableRowsIcon /> Show table
            </>
          )}
        </Button>
      </div>
      <main className="p-16">
        
        {selectedRows.length > 0 ? (
          <>
            {showTable ? <BasicTable data={selectedRows} showDeleteButton={true} showExportButton={true} /> : <FlipCard data={selectedRows} />}
          </>
        ): (
          <div className="h-full w-full flex justify-center items-center">
          <text className="text-white ">Você ainda não salvou nenhuma pesquisa</text> 
          
          </div>
        )}
      </main>
    </div>
  );
};

export default Historic;

