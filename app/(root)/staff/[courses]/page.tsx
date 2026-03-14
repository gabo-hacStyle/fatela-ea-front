import React from "react";
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";



import FiltersForm from "@/components/analysis/filters/FiltersForm";

// import { getInitialInfo } from '@/services/backend/notas'
import InfoCards from "@/components/analysis/InfoCards";
import { getTranslations } from "next-intl/server";

import { handleGetCountries, handleGetPrograms, } from "@/actions/catalogsActions";
import ClientStateSetter from "@/components/hidden/ClientStateSetter";
import GeneratePDF from "@/components/reportes/GeneratePDF";
import CoursesList from "@/components/courses/CoursesList";


const page = async () => {
  const t = await getTranslations("staffPage");

  
  const countriesList = await handleGetCountries();

  return (
    <div>
    
      <ClientStateSetter  mode="staff" countryId={null}/>
      <section
          className="grid md:grid-cols-2  gap-5"
          id="numbersPart"
        >
          
          <Card>
            <CardHeader>
              <CardTitle>{t("coursesTotal")} {'('} {t("timeDefault")} {')'}</CardTitle>
            </CardHeader>
            <CardContent>
              <InfoCards type={"courses"} />
            </CardContent> 
          </Card>
        </section>


      <section
        id="filtros"
        className="p-6 mx-auto my-9 shadow-xl"
      >
        <FiltersForm view="staff" category={'courses'}/>
      </section>

      <section className="grid gap-5" id="analysis">
        <Link href={'/staff'}> Volver a análisis de estudiantes</Link>
        <h1 className="text-center text-2xl my-8">
          {t('headingAnalisys')}
        </h1>
      
          <section className="grid gap-5" >
           
            <CoursesList />
            
            
          </section>
          

        
      </section>

    </div>
  );
};

export default page;