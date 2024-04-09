import React, { useEffect, useRef, forwardRef } from "react";

import {
  reforwardRef,
  cloneData,
  setOptions,
  setLabels,
  setDatasets,
} from "./utils.js";

function ChartComponent(props, ref) {
  const {
    height = 100,
    width = 100,
    redraw = false,
    datasetIdKey,
    type,
    data,
    options,
    plugins = [],
    fallbackContent,
    updateMode,
    ...canvasProps
  } = props;
  const canvasRef = useRef(null);
  const chartRef = useRef();

  const renderChart = () => {
    if (!canvasRef.current) return;

    reforwardRef(ref, chartRef.current);
  };

  const destroyChart = () => {
    reforwardRef(ref, null);

    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }
  };

  useEffect(() => {
    if (!redraw && chartRef.current && options) {
      setOptions(chartRef.current, options);
    }
  }, [redraw, options]);

  useEffect(() => {
    if (!chartRef.current) return;

    destroyChart();
    setTimeout(renderChart);
  }, [type]);

  useEffect(() => {
    renderChart();

    return () => destroyChart();
  }, []);

  return (
    <div className="min-h-[91vh] flex flex-col justify-center items-center bg-black">
      <canvas
        ref={canvasRef}
        role="img"
        height={height}
        width={width}
        {...canvasProps}
        className="canvas"
      >
        {fallbackContent}
      </canvas>
      <iframe
        src=
        //"https://phet.colorado.edu/sims/html/geometric-optics-basics/latest/geometric-optics-basics_uk.html"
        "https://phet.colorado.edu/sims/html/energy-skate-park/latest/energy-skate-park_uk.html"
        className="w-full lg:h-[40rem] xl:h-[68rem] sm: h-[20rem]"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default forwardRef(ChartComponent);
