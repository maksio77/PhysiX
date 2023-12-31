import React from "react";
import MathJax from "react-mathjax";

export function replaceUnderscores(text, formulas) {
    const splitText = text.split('___');
    const replacedText = splitText.map((part, index) => {
        return (
            <React.Fragment key={index}>
                {part}
                {index !== splitText.length - 1 && (
                    <>
                        <br />
                            <MathJax.Node inline formula={formulas[index]} />
                        <br />
                    </>
                )}
            </React.Fragment>
        );
    });

    return (
        <div>
            {replacedText}
        </div>
    );
};
