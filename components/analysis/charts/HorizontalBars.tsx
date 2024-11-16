'use client'
import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTranslations } from "next-intl";
import { useUpdateInfo } from "@/hooks/useUpdateInfo";
import { handleGetQuantityInfo } from '@/actions/gradesActions';

export function HorizontalBars() {
  const t = useTranslations('staffPage');
  const { query, yearSelected, mode, countryId } = useUpdateInfo();
  const [data, setData] = useState<any>(null);
  const [periodo, setPeriodo] = useState<number>();

  useEffect(() => {
    const responseData = async () => {
      const response = await handleGetQuantityInfo(query, mode, countryId);
      if(response){
        if(yearSelected.selected){
          setPeriodo(yearSelected.year);
        }
        
        setData(response);
        
      }
      
    };
    responseData();
  }, [query, mode, countryId]);

  const chartConfig = {
    males: {
      label: t('labelMen'),
      color: "hsl(var(--chart-1))",
    },
    females: {
      label: t('labelWomen'),
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const chartData = [
    { gender: 'males', qty: data?.totalMales, fill: 'var(--color-males)' },
    { gender: 'females', qty: data?.totalFemales, fill: 'var(--color-females)' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Por genero</CardTitle>
        <CardDescription>{t('timeTextDefault')} {`${periodo != null ? periodo : t('timeDefault')}`}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="gender"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <XAxis dataKey="qty" type="number" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="qty"
              layout="vertical"
              fill="hsl(var(--chart-1))"
              radius={4}
            >
              <LabelList
                dataKey="gender"
                position="insideLeft"
                offset={8}
                className="fill-black"
                fontSize={12}
              />
              <LabelList
                dataKey="qty"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}