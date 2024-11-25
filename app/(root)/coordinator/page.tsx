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
import { handleGetQuantityInfo, handleGetStudentsByYear } from "@/actions/gradesActions";
import ClientStateSetter from "@/components/hidden/ClientStateSetter";

import InfoCards from "@/components/analysis/InfoCards";
import { HorizontalBars } from "@/components/analysis/charts/HorizontalBars";
import FiltersForm from "@/components/analysis/filters/FiltersForm";
// import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
// import { handleGetStudents } from "@/actions/catalogsActions";
// import { AreaChart } from "lucide-react";
import { AreaChartComponent } from "@/components/analysis/charts/AreaChart";
import GeneratePDF from "@/components/reportes/GeneratePDF";
const page = async () => {
  const t = await getTranslations("staffPage");

  const user = await getCookie('user');
  const userJson = JSON.parse(user? user : '') as User;
  const country = userJson.country.countryId;

  await handleGetQuantityInfo(null, 'coord', country);
  await handleGetStudentsByYear(country)
    
    return (
    <div>
      <ClientStateSetter mode="coord" countryId={country} />


      <section
        id="filtros"
        className="  p-6 mx-auto my-9 shadow-xl"
      >
        

        <FiltersForm view="coord" />
      </section>

      <section className="grid gap-5" id="analysis">
      <h1 className="text-center text-2xl my-8">
      {t('headingAnalisys')}
      </h1>
      <GeneratePDF countriesList={undefined}/>
        <section
          className="grid md:grid-cols-2 gap-5"
          id="numbersPart"
        >
          <Card>
            <CardHeader>
              <CardTitle>
                {t("studentsTotal")}
           
              </CardTitle>
            </CardHeader>
            <CardContent>
              <InfoCards type={"students"} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
             
                {/* {t("coursesTotal")} {'('} {t("timeDefault")} {')'} */}
                <CardTitle>{t("coursesTotal")} {'('} {t("timeDefault")} {')'}</CardTitle>
               
            </CardHeader>
            <CardContent>
              <InfoCards type={"courses"} />
            </CardContent>
          </Card>
        </section>
        
          <section className="grid lg:grid-cols-2 gap-5">
            <AreaChartComponent />
            <HorizontalBars />
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
  )
}

export default page