import React from "react";
import { MathJaxContext, MathJax } from "better-react-mathjax";

export function replaceUnderscores(text, formulas) {
  const splitText = text.split("___");
  return splitText.map((part, index) => {
    const formula = `\\(${formulas[index]}\\)`;
    return (
      <React.Fragment key={index}>
        <MathJaxContext>
          {part}
          {index !== splitText.length - 1 && (
            <MathJax style={{display: "inline", fontSize: "20px"}}>{formula}</MathJax>
          )}
        </MathJaxContext>
      </React.Fragment>
    );
  });
}
