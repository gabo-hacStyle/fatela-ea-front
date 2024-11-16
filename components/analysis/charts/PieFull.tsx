
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

interface Props {
  type: string;
}

export function PieFull({ type }: Props) {
  const t = useTranslations('staffPage');
  const { query, yearSelected } = useUpdateInfo();
  const [data, setData] = useState<any>(null);
  const [periodo, setPeriodo] = useState<number>();


  function normalizeString(str: string) {
    return str.replace(/\s+/g, '').toLowerCase();
  }

  useEffect(() => {
    console.log('Sera que esta seleccionado un año?', yearSelected.selected)
    console.log('Este es el año seleccionado', yearSelected.year)
    const responseData = async () => {
      const response = await handleGetQuantityInfo(query);
      if(response) {
        if(yearSelected.selected){
          setPeriodo(yearSelected.year);
        }
        setData(response.studentsByCountry as StudentsCountByConutry[]);
      }
      
    };
    responseData();
  }, [query]);



  

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
      <CardHeader className="items-center pb-0">
        <CardTitle>
          Estudiantes por pais
        </CardTitle>
        <CardDescription>
          {t('timeTextDefault')} {`${periodo != null ? periodo : t('timeDefault')}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
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
        </ChartContainer>
      </CardContent>
    </Card>
  );
}