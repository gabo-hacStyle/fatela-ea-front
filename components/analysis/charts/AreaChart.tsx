/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
// import { useRef } from "react"
import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useUpdateInfo } from "@/hooks/useUpdateInfo"
import { useEffect, useState } from "react"
// import { handleGetStudentsByYear } from "@/actions/gradesActions"
import PieGraph from "@/components/shared/skeletons/PieGraph"
import { StudentsByYearResponse } from "@/index"
import { useTranslations } from "next-intl"
import { useGraficoReferenced } from "@/hooks/useReportes"
import { handleGetQuantityInfo } from "@/actions/gradesActions"





export function AreaChartComponent() {
  const { graficoRef1, setBetterYear, setWorstYear } = useGraficoReferenced();
    const t = useTranslations('staffPage');

    const chartConfig = {
        num: {
          
          color: "hsl(var(--chart-1))",
        }, 
        year: {
            label: 'Año'
        }
        
      } satisfies ChartConfig

    const { query, mode, countryId } = useUpdateInfo();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        
        setLoading(true);
        const responseData = async () => {
          
          const response = await handleGetQuantityInfo(query, mode, countryId);
          if(response) {
            setData(response.studentsByYear.map((item: StudentsByYearResponse) => {
                return {
                    year: String(item.year),
                    num: item.count
                }
            }));

            const bestYear = response.studentsByYear.reduce((prev: StudentsByYearResponse, current: StudentsByYearResponse) => {
                return (prev.count > current.count) ? prev : current
            })
            setBetterYear(bestYear.year);
            const worstYear = response.studentsByYear.reduce((prev: StudentsByYearResponse, current: StudentsByYearResponse) => {
                return (prev.count < current.count) ? prev : current
            })
            setWorstYear(worstYear.year);
          }
          setLoading(false);
        };
        setTimeout(() => {
          responseData();
        }, 300)
        // responseData();
      }, [ mode, countryId, query]);
      // console.log('data en el area chart', data);
  return (
    <Card>
      <CardHeader>
        <CardTitle>
            {t('yearGraphTitle')}
        </CardTitle>
        <CardDescription>
        {t('timeTextDefault')} {`${t('timeDefault')}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading && <PieGraph />}
        {!loading && (
            <ChartContainer ref={graficoRef1} className="aspect-16/7 max-h-[300px] mx-auto" config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={data??[]}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
              <defs>
                <linearGradient id="fillNum" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-num)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-num)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                
              </defs>
              
              <Area
                dataKey="num"
                type="natural"
                fill="url(#fillNum)"
                fillOpacity={0.4}
                stroke="var(--color-num)"
                stackId="a"
                label="year"
              />
            </AreaChart>
          </ChartContainer>

        )}
        
      </CardContent>
      
    </Card>
  )
}
