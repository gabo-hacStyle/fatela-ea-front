
'use client';
import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Tooltip,
  LabelList,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTranslations } from "next-intl";
import { useUpdateInfo } from "@/hooks/useUpdateInfo";
import { handleGetQuantityInfo } from '@/actions/gradesActions';
import { StudentsCountByConutry } from '@/index';
import PieGraph from '@/components/shared/skeletons/PieGraph';

interface Props {
  type: string;
}

export function PieFull({ type }: Props) {
  const t = useTranslations('staffPage');
  const { query, yearSelected, mode, countryId } = useUpdateInfo();
  const [data, setData] = useState<any>(null);
  const [periodo, setPeriodo] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);


  function normalizeString(str: string) {
    return str.replace(/\s+/g, '').toLowerCase();
  }

  useEffect(() => {
    // console.log(query)
    // console.log('Sera que esta seleccionado un año?', yearSelected.selected)
    // console.log('Este es el año seleccionado', yearSelected.year)
    setLoading(true);
    const responseData = async () => {
      
      const response = await handleGetQuantityInfo(query, mode, countryId);
      if(response) {
        if(yearSelected.selected){
          setPeriodo(yearSelected.year);
        }
        setData(response.studentsByCountry as StudentsCountByConutry[]);
      }
      setLoading(false);
    };
    setTimeout(() => {
      responseData();
    }, 300)
    // responseData();
  }, [query, mode, countryId]);



  

  // let objectChartConfig: Object[]= [];
  const dataConfig = data?.reduce(
    (acc: any, curr: any) => {
      const realName = normalizeString(curr.country);
      acc[realName] = {
        label: curr.country,
        // color: `hsl(var(--chart-${acc.length + 1}))`,
      };
      return acc;
    },
    {} as Record<string, { label: string;}>,
  );

  const chartConfig = {
    students: {
      label: 'Estudiantes'
    },
    ...dataConfig
  } satisfies ChartConfig;

  const chartData = data?.map((item: StudentsCountByConutry, index: number) => {
    const realName = normalizeString(item.country);
    return {
      country: realName,
      qty: item.count,
      fill: `hsl(var(--chart-${index + 1}))`,
    };
  });

  return (
    <Card className="flex flex-col">
      <CardHeader className=" pb-0">
        <CardTitle>
          {t('countryPieTitle')}
        </CardTitle>
        <CardDescription>
          {t('timeTextDefault')} {`${periodo != null ? periodo : t('timeDefault')}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
    {loading && <PieGraph />}
    {!loading && (
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="qty" nameKey="country" />
            {/* <LabelList
                dataKey="country"
                className="fill-primary"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              /> */}
            
            
          </PieChart>
        </ChartContainer>)}
      </CardContent>
    </Card>
  );
}