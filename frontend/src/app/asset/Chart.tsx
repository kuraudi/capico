import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

interface DataItem {
  name: string;
  value: number;
  color: string;
}

const Chart = ({ data }: { data: DataItem[] }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [hoveredSegment, setHoveredSegment] = useState<DataItem | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  useEffect(() => {
    if (!chartRef.current || !data?.length) return;

    const chart = echarts.init(chartRef.current, null, { renderer: "canvas" });

    const updateChart = (
      chartData: DataItem[],
      centerText?: string,
      centerSubText?: string
    ) => {
      chart.setOption({
        series: [
          {
            type: "pie",
            radius: ["50%", "80%"],
            animationDuration: 500,
            data: chartData.map((item) => ({
              value: item.value,
              name: item.name,
              itemStyle: { color: item.color },
            })),
            label: { show: false },
          },
        ],
        graphic: [
          {
            type: "text",
            left: "center",
            top: "center",
            style: {
              text: centerText || "Assets",
              fill: "#fff",
              fontSize: 14,
              fontWeight: "bold",
            },
          },
          {
            type: "text",
            left: "center",
            top: "55%",
            style: {
              text: centerSubText || "",
              fill: "#bbb",
              fontSize: 12,
            },
          },
        ],
      });
    };

    updateChart(data);

    chart.on("mouseover", (params) => {
      setHoveredItem(params.name);
    });

    chart.on("mouseout", () => {
      setHoveredItem(null);
    });

    return () => chart.dispose();
  }, [data, hoveredSegment]);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.getInstanceByDom(chartRef.current);
    if (!chart) return;

    const hasData = data.some((item) => item.value > 0);

    const updateChart = (
      chartData: DataItem[],
      centerText?: string,
      centerSubText?: string
    ) => {
      chart.setOption({
        series: [
          {
            type: "pie",
            radius: ["60%", "80%"],
            animationDuration: 500,
            data: hasData
              ? chartData
                  .filter((item) => item.value > 0)
                  .map((item) => ({
                    value: item.value,
                    name: item.name,
                    itemStyle: { color: item.color },
                  }))
              : [{ value: 1, name: "Empty", itemStyle: { color: "#444" } }],
            label: { show: false },
          },
        ],
        graphic: [
          {
            type: "text",
            left: "center",
            top: "center",
            style: {
              text: centerText || "Assets",
              fill: "#fff",
              fontSize: 14,
              fontWeight: "bold",
            },
          },
          {
            type: "text",
            left: "center",
            top: "55%",
            style: {
              text: centerSubText || "",
              fill: "#bbb",
              fontSize: 12,
            },
          },
        ],
      });
    };

    if (hoveredSegment) {
      const percentage =
        ((hoveredSegment.value / totalValue) * 100).toFixed(1) + "%";
      updateChart(data, hoveredSegment.name, percentage);
    } else {
      updateChart(data);
    }
  }, [hoveredSegment, data, totalValue]);

  return (
    <div className="flex items-center justify-between">
      <div className="relative w-[250px] h-[250px]" ref={chartRef}></div>
      <ul className="space-y-2">
        {data.map((item) => {
          const percentage =
            totalValue > 0
              ? ((item.value / totalValue) * 100).toFixed(1) + "%"
              : "0%";
          return (
            <li
              key={item.name}
              className={`cursor-pointer text-[#878686] font-nekstmedium transition flex items-center gap-2 p-[2px] px-[30px] rounded-[5px] ${
                hoveredSegment?.name === item.name || hoveredItem === item.name
                  ? "bg-[#444]"
                  : "hover:bg-[#444]"
              }`}
              onMouseEnter={() => setHoveredSegment(item)}
              onMouseLeave={() => setHoveredSegment(null)}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.color }}
              ></span>
              {item.name} {percentage}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Chart;
