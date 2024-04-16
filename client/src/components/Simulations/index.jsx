import { useEffect, useRef, forwardRef } from "react";
import { useParams } from "react-router-dom";

import { reforwardRef, setOptions } from "./utils.js";

function ChartComponent(props, ref) {
  const {
    height = 100,
    width = 100,
    redraw = false,
    datasetIdKey,
    type,
    data,
    options,
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

  let { name } = useParams();
  const simulations = [
    {
      link: "https://phet.colorado.edu/sims/html/geometric-optics-basics/latest/geometric-optics-basics_uk.html",
      name: "optics",
    },
    {
      link: "https://phet.colorado.edu/sims/html/energy-skate-park/latest/energy-skate-park_uk.html",
      name: "skatesPark",
    },
    {
      link: "https://phet.colorado.edu/sims/html/circuit-construction-kit-ac/latest/circuit-construction-kit-ac_uk.html",
      name: "electricCircuit",
    },
    {
      link: "https://phet.colorado.edu/sims/html/density/latest/density_uk.html",
      name: "density",
    },
    {
      link: "https://phet.colorado.edu/sims/html/build-a-nucleus/latest/build-a-nucleus_uk.html",
      name: "buildNucleus",
    },
    {
      link: "https://phet.colorado.edu/sims/html/waves-intro/latest/waves-intro_uk.html",
      name: "wawes",
    },
    {
      link: "https://phet.colorado.edu/sims/html/gas-properties/latest/gas-properties_uk.html",
      name: "gasProperties",
    },
    {
      link: "https://phet.colorado.edu/sims/html/faradays-law/latest/faradays-law_uk.html",
      name: "faradaysLaw",
    },
    {
      link: "https://phet.colorado.edu/sims/html/rutherford-scattering/latest/rutherford-scattering_uk.html",
      name: "rutherfordScattering",
    },
    {
      link: "https://phet.colorado.edu/sims/html/energy-forms-and-changes/latest/energy-forms-and-changes_uk.html",
      name: "energyFormsAndChanges",
    },
  ];

  const simulationLink = simulations.find(
    (simulation) => simulation.name === name
  )?.link;

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
        src={simulationLink}
        className="w-full lg:h-[40rem] xl:h-[68rem] sm: h-[20rem]"
        allowFullScreen
        allow="autoplay"
        title="simulation"
      ></iframe>
    </div>
  );
}

export default forwardRef(ChartComponent);
