import * as React from "react";

export const JYCMContext = React.createContext<any>(null);

export const useJYCM = (value: any) => value;

export const JYCMRender = ({
  leftTitle,
  rightTitle,
}: {
  leftTitle: string;
  rightTitle: string;
}) => (
  <div>
    Synchronized JYCM viewer: {leftTitle} / {rightTitle}
  </div>
);
