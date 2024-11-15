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
import FiltersForm from "@/components/analysis/filters/FiltersForm";

// import { getInitialInfo } from '@/services/backend/notas'
import InfoCards from "@/components/analysis/InfoCards";
import { PieFull } from "@/components/analysis/charts/PieFull";
import { getTranslations } from "next-intl/server";
import { HorizontalBars } from "@/components/analysis/charts/HorizontalBars";
import { handleGetCountries, handleGetPrograms, handleGetCourses, handleGetStudents } from "@/actions/catalogsActions";
import { handleGetQuantityInfo } from "@/actions/gradesActions";


const page = async () => {
  //para internacionalizacion
  const t = await getTranslations("staffPage");
  await handleGetCourses();
  await handleGetStudents();
  await handleGetPrograms();
  await handleGetCountries();
  await handleGetQuantityInfo(null);


  
  
  return (
    <div>
      <header>
        <p className="text-2xl font-semibold">{t("header")}</p>
      </header>

      <LogoutButton position="sidebar" />


      <section
        id="filtros"
        className=" border-secondary border-2 rounded-lg p-6 mx-auto my-9"
      >
        <h2 className="text-xl">{t("filtersTitle")}</h2>

        FiltersForm

        {/* <div className="grid grid-cols-2 gap-4"> */}
          {/* <div className="col-span-2">
            <div className="grid md:grid-cols-2 gap-4"> */}
              {/* <SelectItemsPaginated
                programs={programs}
                courses={null}
                students={null}
                type="programs"
              />
              <SelectItemsPaginated
                programs={null}
                courses={[coursesFirstHalf, coursesSecondHalf]}
                students={null}
                type="courses"
              />
              <SelectItemsPaginated
                programs={null}
                courses={null}
                students={[
                  studentsFirstQuarter,
                  studentsSecondQuarter,
                  studentsThirdQuarter,
                  studentsFourthQuarter,
                ]}
                type="students"
              /> */}
            {/* </div>
          </div> */}
        {/* </div> */}

        <FiltersForm />
      </section>

      <section className="grid gap-5" id="analysis">
        <section
          className="grid md:grid-cols-2 2xl:grid-cols-4 gap-5"
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

          <Card>
            <CardHeader>
              <CardTitle>{t("coursesTotal")}</CardTitle>
            </CardHeader>
            <CardContent>
              <InfoCards type={"courses"} />
            </CardContent>
          </Card>
        </section>
        <section className="grid grid-cols-2 gap-5">
          <PieFull type={"genders"} />
          <HorizontalBars />
          <div className="h-28"></div>
          <div className="h-28"></div>
          <div className="h-28"></div>
        </section>
      </section>
    </div>
  );
};

export default page;
