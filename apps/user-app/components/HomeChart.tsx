"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart"
const chartData = [
  { month: "January", expenses: 186 },
  { month: "February", expenses: 305 },
  { month: "March", expenses: 237 },
  { month: "April", expenses: 73 },
  { month: "May", expenses: 209 },
  { month: "June", expenses: 214 },
]

const chartConfig = {
  expenses: {
    label: "Expenses",
    color: "purple",
  },
} satisfies ChartConfig

export function ChartComp() {
  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle>Balances</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[20rem] w-[70vw]">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 1,
              right: 1,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="expenses"
              type="natural"
              stroke="var(--color-expenses)"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>

    </Card>
  )
}
