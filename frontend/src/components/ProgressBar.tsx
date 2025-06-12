import React from "react";

type Prop = {
  progress: number;
};

export default function ProgressBar({ progress }: Prop) {
  const Parentdiv: React.CSSProperties = {
    height: "30px",
    width: "100%",
    backgroundColor: "whitesmoke",
    border: "0.1em solid rgb(210, 209, 209)",
    borderRadius: 40
  };

  const Childdiv: React.CSSProperties = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: progress === 100 ? "green" : "#456ea0",
    borderRadius: 40,
    textAlign: "right"
  };

  const progresstext: React.CSSProperties = {
    padding: 10,
    color: "white",
    fontWeight: 500
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${progress}%`}</span>
      </div>
    </div>
  );
}
