import React from "react";
import { MathJaxContext, MathJax } from "better-react-mathjax";

export function replaceUnderscores(text, formulas) {
  const splitText = text.split("___");
  return splitText.map((part, index) => {
    return (
      <React.Fragment key={index}>
        <MathJaxContext>
          {part}
          {index !== splitText.length - 1 && (
            <MathJax>{`\\(${formulas[index]}\\)`}</MathJax>
          )}
        </MathJaxContext>
      </React.Fragment>
    );
  });
}
