import React from "react";
import GridLayout from "react-grid-layout";

export default function OutsideWrapper({ showGroupedData, children }) {
  // const layout = [{ i: "a", x: 4, y: 0, w: 1, h: 2 }];
  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
    { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 },
  ];
  // return showGroupedData ? (
  //   <React.Fragment>{children}</React.Fragment>
  // ) : (
  //   <GridLayout
  //     className="layout"
  //     layout={layout}
  //     cols={12}
  //     rowHeight={30}
  //     width={1200}
  //   >
  //     {children}
  //   </GridLayout>
  // );
  return children;
}