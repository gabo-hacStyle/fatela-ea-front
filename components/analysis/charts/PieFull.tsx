"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

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
import { InitialInfo } from "@/index"

//i18n
import { useTranslations } from "next-intl"



interface Props {
    data: any;
    type: string;
}


export function PieFull({
    data, type
}: Props) {
    const t = useTranslations('staffPage');

    const chartConfig = {
        males: {
          label: t('labelMen'),
          color: "hsl(var(--chart-1))",
        },
        females: {
            label: t('labelWomen'),
            color: "hsl(var(--chart-2))",
          },
      } satisfies ChartConfig


    const dataToRender = type  === 'genders' ? 
        data as InitialInfo : null;
    
    const chartData = [
        { gender: 'males', qty: dataToRender?.totalMales,   fill: 'var(--color-males)'},
        {gender: 'females', qty: dataToRender?.totalFemales ,fill: 'var(--color-females)'}
    ]


    

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>
            {t('genderPieTitle')}
        </CardTitle>
        <CardDescription>
            {t('timeTextDefault')} {t('timeDefault')}
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
            <Pie data={chartData} dataKey="qty" nameKey="gender" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  )
}
