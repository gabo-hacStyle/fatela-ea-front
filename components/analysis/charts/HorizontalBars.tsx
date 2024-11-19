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
import PieGraph from '@/components/shared/skeletons/PieGraph';
import BarsGraph from '@/components/shared/skeletons/BarsGraph';

export function HorizontalBars() {
  const t = useTranslations('staffPage');
  const { query, yearSelected, mode, countryId } = useUpdateInfo();
  const [data, setData] = useState<any>(null);
  const [periodo, setPeriodo] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const responseData = async () => {
      setLoading(true);
      const response = await handleGetQuantityInfo(query, mode, countryId);
      if(response){
        if(yearSelected.selected){
          setPeriodo(yearSelected.year);
        }
        
        setData(response);
        
      }
      setLoading(false);
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
    { gender: `${t('labelMen')}`, num: data?.totalMales, fill: 'var(--color-males)' },
    { gender: `${t('labelWomen')}`, num: data?.totalFemales, fill: 'var(--color-females)' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t('genderPieTitle')}
        </CardTitle>
        <CardDescription>{t('timeTextDefault')} {`${periodo != null ? periodo : t('timeDefault')}`}</CardDescription>
      </CardHeader>
      <CardContent>
        {loading && <div className="flex justify-center"><BarsGraph /></div>}
        {!loading &&  (
        <ChartContainer config={chartConfig} className="mx-auto aspect-video max-h-[250px]">
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
              tickFormatter={(value) => value}
            />
            <XAxis dataKey='num' type="number" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="num"
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
                dataKey="num"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>)}
      </CardContent>
    </Card>
  );
}