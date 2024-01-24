import React from "react";
import { MathJaxContext, MathJax } from "better-react-mathjax";

export function replaceUnderscores(text, formulas) {
  const splitText = text.split("___");
  return splitText.map((part, index) => {
    return (
      <React.Fragment key={index}>
        <MathJaxContext>
          <h2>{part}</h2>
          {index !== splitText.length - 1 && (
            <MathJax>{`\\(${formulas[index]}\\)`}</MathJax>
          )}
        </MathJaxContext>
      </React.Fragment>
    );
  });
}
