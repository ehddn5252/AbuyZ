import React from "react";
export default function IncompleteAnswer({ complainList }) {
  let cnt = 0;
  for (var i = 0; i < complainList.length; i++) {
    if (complainList[i].reply === null) {
      cnt += 1;
    }
  }
  return (
    <div>
      <span style={{ color: "#56a9f1" }}>{cnt}</span>
      <span>건</span>
    </div>
  );
}
