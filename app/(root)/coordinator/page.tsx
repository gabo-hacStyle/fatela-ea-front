import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import TableContent from "@/components/analysis/TableContent";
import { getCookie } from "@/utils/cookiesManager";
import { User } from "@/index";
import { handleGetQuantityInfo } from "@/actions/gradesActions";
import ClientStateSetter from "@/components/hidden/ClientStateSetter";

import InfoCards from "@/components/analysis/InfoCards";
import { HorizontalBars } from "@/components/analysis/charts/HorizontalBars";
import FiltersForm from "@/components/analysis/filters/FiltersForm";
const page = async () => {

  const user = await getCookie('user');
  const userJson = JSON.parse(user? user : '') as User;
  const country = userJson.country.countryId;

  await handleGetQuantityInfo(null, 'coord', country);
    
    return (
    <div>
      <ClientStateSetter mode="coord" countryId={country} />


      <section
        id="filtros"
        className=" border-secondary border-2 rounded-lg p-6 mx-auto my-9"
      >
        <h2 className="text-xl">Filtros</h2>

        <FiltersForm view="coord" />
      </section>

      <section className="grid gap-5" id="analysis">
        <section
          className="grid md:grid-cols-2 2xl:grid-cols-4 gap-5"
          id="numbersPart"
        >
          <Card>
            <CardHeader>
              <CardTitle>
                {/* {t("studentsTotal")} */}
                Estudiantes totales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <InfoCards type={"students"} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {/* {t("coursesTotal")} {'('} {t("timeDefault")} {')'} */}
                Cursos totales (historico)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <InfoCards type={"courses"} />
            </CardContent>
          </Card>
        </section>
        
          <section className="grid md:grid-cols-2 gap-5">
            <HorizontalBars />
          </section>
          

        
      </section>



        <section className="my-14">
        <h2 className="my-6">
          Listado de notas:
        </h2>
            <div className="relative w-full max-h-[51vh] overflow-auto ">
            <Table className="w-full">
          
                <TableHeader>
                  <TableRow>
                    <TableHead >Estudiante</TableHead>
                    <TableHead className="bg-accent/80">Nota</TableHead>
                    <TableHead>Aprovado</TableHead>
                    <TableHead>Curso</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Año</TableHead>

                  </TableRow>
                </TableHeader>
                <TableContent />
                
              </Table>


            </div>
         
          </section>
    </div>
  )
}

export default page