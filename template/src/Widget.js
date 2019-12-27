import React from "react";

function Widget(initialProps) {
  return (
    <>
      <div>{initialProps.message}</div>
      <button
        onClick={() => {
          window.FileMaker.PerformScript(
            "HandleOnClick",
            "Hello from Web Land!"
          );
        }}
      >
        Run a FileMaker Script
      </button>
    </>
  );
}

export default Widget;
