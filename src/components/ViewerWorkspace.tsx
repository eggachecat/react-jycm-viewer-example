import * as React from "react";
import { JYCMContext, JYCMRender, useJYCM } from "react-jycm-viewer";

type ViewerWorkspaceProps = {
  leftValue: unknown;
  rightValue: unknown;
  diffValue: any;
};

export default function ViewerWorkspace({
  leftValue,
  rightValue,
  diffValue,
}: ViewerWorkspaceProps) {
  const contextValue = useJYCM({
    leftJsonStr: JSON.stringify(leftValue, null, 2),
    rightJsonStr: JSON.stringify(rightValue, null, 2),
    diffResult: diffValue,
  });

  return (
    <JYCMContext.Provider value={contextValue}>
      <JYCMRender leftTitle="Benchmark" rightTitle="Actual" />
    </JYCMContext.Provider>
  );
}
