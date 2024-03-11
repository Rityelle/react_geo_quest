"use client";
import { useEffect, useState } from "react";

//MUI
import TableRowsIcon from '@mui/icons-material/TableRows';
import GridViewIcon from '@mui/icons-material/GridView';
import HistoryIcon from '@mui/icons-material/History';

//navigation
import { useRouter } from "next/navigation";

//Atoms
import Button from "@/components/atoms/button";

//organisms
import BasicTable from "@/components/organisms/Table";
import FlipCard from "@/components/organisms/Card";
import Header from "@/components/organisms/Header";

//types
import { Country } from "@/types/Country";

//api
import api from "@/utils/axios";


export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [showTable, setShowTable] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  //gets filtered information directly from the provided api
  const fetchData = async () => {
    try {
      const response = await api.get(
        "/all?fields=name,capital,currencies,languages,population,flags,continents"
      );
      setCountries(response.data);
    } catch (error) {
      console.error("Erro ao fazer requisição:", error);
    }
  };

  const toggleView = () => {
    //toogleview that switches the view for the user
    setShowTable(!showTable);
  };

  return (
    <div>
      <Header />

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

        <Button onPress={() => router.push("/historic")}> <HistoryIcon /> Historic</Button>
      </div>
      
      <main className="p-16">
        {showTable ? (
          <BasicTable data={countries} showSaveButton={true} />
        ) : (
          <FlipCard data={countries} />
        )}
      </main>
    </div>
  );
}
