import React from "react";
import PieComponent from "@/components/analysis/charts/PieComponent";
import { getCookie } from "@/utils/cookiesManager";
import {
  getPrograms,
  getCourses,
  getStudents,
} from "@/services/backend/catalogs";
import { Badge } from "@/components/ui/badge";
import SelectItemsPaginated from "@/components/analysis/filters/SelectItemsPaginated";
import LogoutButton from "@/components/shared/LogoutButton";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import FiltersForm from "@/components/analysis/filters/FiltersForm";

// import { getInitialInfo } from '@/services/backend/notas'
import InfoCards from "@/components/analysis/InfoCards";
import { PieFull } from "@/components/analysis/charts/PieFull";
import { getTranslations } from "next-intl/server";
import { HorizontalBars } from "@/components/analysis/charts/HorizontalBars";
import { handleGetCountries, handleGetPrograms, } from "@/actions/catalogsActions";
import {  handleGetQuantityInfo } from "@/actions/gradesActions";
import TableContent from "@/components/analysis/TableContent";
import ClientStateSetter from "@/components/hidden/ClientStateSetter";
import { AreaChartComponent } from "@/components/analysis/charts/AreaChart";
import GeneratePDF from "@/components/reportes/GeneratePDF";


const page = async () => {
  //para internacionalizacion
  const t = await getTranslations("staffPage");
  // await handleGetCourses();
  // await handleGetStudents();
  await handleGetPrograms();
  const countriesList = await handleGetCountries();
  await handleGetQuantityInfo(null, 'staff', null);
 
  // await handleGetGradesFiltered(null);


  
  
  return (
    <div>
      {/* <header>
        <p className="text-2xl font-semibold">{t("header")}</p>
      </header>

      <LogoutButton position="sidebar" /> */}
      <ClientStateSetter  mode="staff" countryId={null}/>


      <section
        id="filtros"
        className="  p-6 mx-auto my-9 shadow-xl"
      >
        {/* <h2 className="text-xl font-semibold rounded-md text-center w-1/4 bg-primary  text-white py-1  ">{t("filtersTitle")}</h2> */}

        <FiltersForm view="staff" />
      </section>

      <section className="grid gap-5" id="analysis">
        <h1 className="text-center text-2xl my-8">
          {t('headingAnalisys')}
        </h1>
        <GeneratePDF  countriesList={countriesList}/>
        <section
          className="grid md:grid-cols-2  gap-5"
          id="numbersPart"
        >
          <Card>
            <CardHeader>
              <CardTitle>{t("studentsTotal")}</CardTitle>
            </CardHeader>
            <CardContent>
              <InfoCards type={"students"} />
            </CardContent>
          </Card>

          {/* <Card>
            <CardHeader>
              <CardTitle>{t("coursesTotal")} {'('} {t("timeDefault")} {')'}</CardTitle>
            </CardHeader>
            {/* <CardContent>
              <InfoCards type={"courses"} />
            </CardContent> 
          </Card> */}
        </section>
        
          <section className="grid gap-5" >
            <div>
              <AreaChartComponent />
            </div>
            <div className="grid lg:grid-cols-2 gap-5">
            <PieFull type={"genders"} />
            <HorizontalBars />
            </div>
            
            
          </section>
          

        
      </section>

      <section className="my-14">
        <h2 className="text-center text-2xl my-8">
          {t('headingGrades')}
        </h2>
            <div className="relative w-full max-h-[51vh] overflow-auto ">
            <Table className="w-full">
          
                <TableHeader>
                  <TableRow>
                    <TableHead >{t('studentLabel')}</TableHead>
                    <TableHead>{t('gradeLabel')}</TableHead>
                    <TableHead>{t('approvedLabel')}</TableHead>
                    <TableHead>{t('courseLabel')}</TableHead>
                    <TableHead>{t('statusLabel')}</TableHead>
                    <TableHead>{t('yearLabel')}</TableHead>

                  </TableRow>
                </TableHeader>
                <TableContent />
                
              </Table>


            </div>
         
          </section>
    </div>
  );
};

export default page;
