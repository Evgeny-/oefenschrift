import React, { useEffect, useRef } from 'react';
// Apache ECharts renders only in the browser; the server sends an empty, sized box.
// Colours and type come from the stylesheet tokens at mount, so the admin charts
// follow the light and dark palettes without a second theme definition.
let runtime: Promise<any> | null = null;
function load() {
  runtime ??= Promise.all([
    import('echarts/core'),
    import('echarts/charts'),
    import('echarts/components'),
    import('echarts/renderers'),
  ]).then(([core, charts, components, renderers]) => {
    core.use([
      charts.BarChart,
      charts.LineChart,
      charts.PieChart,
      components.GridComponent,
      components.TooltipComponent,
      components.LegendComponent,
      renderers.CanvasRenderer,
    ]);
    return core;
  });
  return runtime;
}
export function tokens() {
  const style = getComputedStyle(document.documentElement),
    read = (name) => style.getPropertyValue(name).trim();
  return {
    ink: read('--ink'),
    muted: read('--muted'),
    line: read('--line'),
    sheet: read('--sheet'),
    series: [read('--chart-1'), read('--chart-2'), read('--chart-3')],
    bad: read('--chart-bad'),
    font: '"Public Sans", "Helvetica Neue", sans-serif',
  };
}
export type OptionBuilder = (t: ReturnType<typeof tokens>) => Record<string, any>;
export default function Chart({
  build,
  height = 240,
  label,
}: {
  build: OptionBuilder;
  height?: number;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let chart: any = null,
      disposed = false,
      observer: ResizeObserver | null = null,
      themes: MutationObserver | null = null;
    load().then((core) => {
      if (disposed || !ref.current) return;
      chart = core.init(ref.current, null, { renderer: 'canvas' });
      const paint = () => {
        const t = tokens();
        chart.setOption(
          {
            textStyle: { fontFamily: t.font, color: t.muted },
            animationDuration: 300,
            ...build(t),
          },
          true,
        );
      };
      paint();
      observer = new ResizeObserver(() => chart?.resize());
      observer.observe(ref.current);
      // The theme switch changes the tokens in place; repaint with the new palette.
      themes = new MutationObserver(paint);
      themes.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme'],
      });
    });
    return () => {
      disposed = true;
      observer?.disconnect();
      themes?.disconnect();
      chart?.dispose();
    };
  }, [build]);
  return <div ref={ref} className="chart" style={{ height }} role="img" aria-label={label} />;
}
// Shared anatomy: hairline grid, no axis lines, thin marks, tooltip on the sheet.
export function axes(t, { legend = false, percent = false } = {}) {
  return {
    grid: { left: 8, right: 8, top: 12, bottom: legend ? 32 : 8, containLabel: true },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'line', lineStyle: { color: t.line } },
      backgroundColor: t.sheet,
      borderColor: t.line,
      borderWidth: 1,
      textStyle: { color: t.ink, fontFamily: t.font, fontSize: 12 },
      padding: [8, 10],
      extraCssText: 'box-shadow:none;border-radius:8px;',
      valueFormatter: (value) => (percent ? `${Math.round(Number(value))}%` : String(value)),
    },
    xAxis: {
      type: 'category',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: t.muted, fontSize: 11, hideOverlap: true },
    },
    yAxis: {
      type: 'value',
      minInterval: percent ? undefined : 1,
      max: percent ? 100 : undefined,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: t.line } },
      axisLabel: { color: t.muted, fontSize: 11, formatter: percent ? '{value}%' : undefined },
    },
    ...(legend
      ? {
          legend: {
            bottom: 0,
            icon: 'roundRect',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 16,
            textStyle: { color: t.muted, fontSize: 12 },
          },
        }
      : {}),
  };
}
export const bar = (name, data, color, t, { stack = undefined, top = true } = {}) => ({
  name,
  type: 'bar',
  stack,
  data,
  barMaxWidth: 24,
  itemStyle: { color, borderRadius: top ? [4, 4, 0, 0] : 0, borderColor: t.sheet, borderWidth: 1 },
  emphasis: { itemStyle: { color } },
});
export const line = (name, data, color, t) => ({
  name,
  type: 'line',
  data,
  lineStyle: { width: 2, color },
  itemStyle: { color, borderColor: t.sheet, borderWidth: 2 },
  symbol: 'circle',
  symbolSize: 8,
  showSymbol: false,
  emphasis: { scale: false },
});
export function shortDay(day: string) {
  const date = new Date(day + 'T00:00:00Z');
  return `${date.getUTCDate()} ${['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'][date.getUTCMonth()]}`;
}
