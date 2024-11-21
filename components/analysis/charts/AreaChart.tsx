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
import { handleGetStudentsByYear } from "@/actions/gradesActions"
import PieGraph from "@/components/shared/skeletons/PieGraph"
import { StudentsByYearResponse } from "@/index"
import { useTranslations } from "next-intl"
import { useGraficoReferenced } from "@/hooks/useReportes"





export function AreaChartComponent() {
  const { graficoRef1, setBetterYear, setWorstYear } = useGraficoReferenced();
    const t = useTranslations('staffPage');

    const chartConfig = {
        count: {
          
          color: "hsl(var(--chart-1))",
        }, 
        year: {
            label: 'Año'
        }
        
      } satisfies ChartConfig

    const { mode, countryId } = useUpdateInfo();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        
        setLoading(true);
        const responseData = async () => {
          
          const response = await handleGetStudentsByYear(countryId);
          if(response) {
            setData(response.map((item: StudentsByYearResponse) => {
                return {
                    year: String(item.year),
                    count: item.count
                }
            }));

            const bestYear = response.reduce((prev: StudentsByYearResponse, current: StudentsByYearResponse) => {
                return (prev.count > current.count) ? prev : current
            })
            setBetterYear(bestYear.year);
            const worstYear = response.reduce((prev: StudentsByYearResponse, current: StudentsByYearResponse) => {
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
      }, [ mode, countryId]);
      console.log('data en el area chart', data);
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
                <linearGradient id="fillCount" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-count)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-count)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                
              </defs>
              
              <Area
                dataKey="count"
                type="natural"
                fill="url(#fillCount)"
                fillOpacity={0.4}
                stroke="var(--color-count)"
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