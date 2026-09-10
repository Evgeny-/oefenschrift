import React, { useEffect, useRef } from 'react';
// Apache ECharts renders only in the browser; the server sends an empty, sized box.
// Colours and type come from the stylesheet tokens at mount, so the admin charts
// follow the light and dark palettes without a second theme definition.
// A load that fails (a navigation that interrupts it, a stale chunk after a rebuild) is
// forgotten, so the next chart mount tries again instead of inheriting the failure.
let runtime: Promise<any> | null = null;
function load() {
  runtime ??= Promise.all([
    import('echarts/core'),
    import('echarts/charts'),
    import('echarts/components'),
    import('echarts/renderers'),
  ])
    .then(([core, charts, components, renderers]) => {
      core.use([
        charts.BarChart,
        charts.LineChart,
        charts.PieChart,
        components.GridComponent,
        components.TooltipComponent,
        components.LegendComponent,
        components.TitleComponent,
        renderers.CanvasRenderer,
      ]);
      return core;
    })
    .catch((error) => {
      runtime = null;
      throw error;
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
    surface: read('--paper'),
    series: [read('--chart-1'), read('--chart-2'), read('--chart-3')],
    bad: read('--chart-bad'),
    font: getComputedStyle(document.body).fontFamily,
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
    load()
      .then((core) => {
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
      })
      .catch(() => {
        // The box stays empty; a later mount loads the chart again.
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
// Shared anatomy: hairline grid, no axis lines, thin marks separated by the paper, tooltip on the sheet.
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
  itemStyle: {
    color,
    borderRadius: top ? [4, 4, 0, 0] : 0,
    borderColor: t.surface,
    borderWidth: 1,
  },
  emphasis: { itemStyle: { color } },
});
export const line = (name, data, color, t) => ({
  name,
  type: 'line',
  data,
  lineStyle: { width: 2, color },
  itemStyle: { color, borderColor: t.surface, borderWidth: 2 },
  symbol: 'circle',
  symbolSize: 8,
  showSymbol: false,
  emphasis: { scale: false },
});
// A ring of shares with the legend beside it; `centre` puts a figure and a word in the hole.
export function donut(
  slices: { name: string; value: number; color?: string }[],
  t,
  { centre = undefined }: { centre?: { value: string; label: string } } = {},
) {
  return {
    tooltip: {
      trigger: 'item',
      backgroundColor: t.sheet,
      borderColor: t.line,
      borderWidth: 1,
      textStyle: { color: t.ink, fontFamily: t.font, fontSize: 12 },
      extraCssText: 'box-shadow:none;border-radius:8px;',
    },
    legend: {
      right: 0,
      top: 'middle',
      orient: 'vertical',
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      textStyle: { color: t.muted, fontSize: 12 },
    },
    ...(centre
      ? {
          title: {
            text: centre.value,
            subtext: centre.label,
            left: '35%',
            top: 'middle',
            textAlign: 'center',
            itemGap: 2,
            textStyle: { color: t.ink, fontSize: 20, fontWeight: 600, fontFamily: t.font },
            subtextStyle: { color: t.muted, fontSize: 12, fontFamily: t.font },
          },
        }
      : {}),
    series: [
      {
        type: 'pie',
        radius: ['58%', '82%'],
        center: ['35%', '50%'],
        label: { show: false },
        itemStyle: { borderColor: t.surface, borderWidth: 2 },
        emphasis: { scale: false },
        data: slices.map((slice, i) => ({
          name: slice.name,
          value: slice.value,
          itemStyle: { color: slice.color || t.series[i % 3] },
        })),
      },
    ],
  };
}
export function shortDay(day: string) {
  const date = new Date(day + 'T00:00:00Z');
  return `${date.getUTCDate()} ${['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'][date.getUTCMonth()]}`;
}
