import React from 'react';

import JYCMLib, {
  JYCMRender,
  JYCMContext,
  IUseJYCMProps,
  IJYCMRenderProps,
  useJYCM
} from "react-jycm-viewer";
import { leftJson, rightJson, diffResult as diffResultJson } from './render-case/case-1';

const SimpleForm: React.FC<{
  label: string,
  children?: React.ReactNode
}> = ({ label, children }) => {
  return <div style={{
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    padding: "0 15px"
  }}
  >
    <div style={{ display: "inline-block" }}>{label}:</div>
    <div style={{ width: "100%" }}>{children}</div>
  </div>
}

const safeJSONCallback = (value: string, cb: (v: string) => void) => {
  try {
    JSON.parse(value);
    return cb(value)
  } catch (e) {
    return false;
  }
}


function Demo() {
  const [leftJsonStr, setLeftJsonStr] = React.useState(JSON.stringify(leftJson))
  const [rightJsonStr, setRightJsonStr] = React.useState(JSON.stringify(rightJson))
  const [diffResult, setJYCMResult] = React.useState(diffResultJson);

  // use this can ave your time! see provider below
  const jycmContextValue = useJYCM({
    leftJsonStr,
    rightJsonStr,
    diffResult,
  });

  // In your component you can use all properties from jycm
  // using code 
  // const jycmContext = useContext(JYCMContext)!;


  return <div style={{ height: "100%", width: "100%" }}>
    <h1>Demo For JYCM render</h1>
    <div style={{ height: "100%", width: "100%", display: "flex" }}>
      <SimpleForm label="left JSON">
        <textarea
          style={{ width: "100%", wordBreak: "break-all" }}
          rows={5}
          defaultValue={leftJsonStr}
          onChange={e => { safeJSONCallback(e.target.value, setLeftJsonStr) }} />
      </SimpleForm>
      <SimpleForm label="right JSON">
        <textarea
          style={{ width: "100%", wordBreak: "break-all" }}
          rows={5}
          defaultValue={rightJsonStr}
          onChange={e => { safeJSONCallback(e.target.value, setRightJsonStr) }} />
      </SimpleForm>
      <SimpleForm label="JYCM Result">
        <textarea
          style={{ width: "100%", wordBreak: "break-all" }}
          rows={5}
          defaultValue={JSON.stringify(diffResultJson)}
          onChange={e => { safeJSONCallback(e.target.value, (v) => setJYCMResult(JSON.parse(v))) }} />
      </SimpleForm>
    </div>

    <div style={{ height: "800px", width: "100%", border: "1px solid red", marginTop: "15px" }}>
      {/********** any component under this provider can have access to the diff etc. 
            You can control the editor very easy.   **********/}
      <JYCMContext.Provider value={jycmContextValue}>
        <JYCMRender leftTitle="BenchMark" rightTitle="Actual" />
      </JYCMContext.Provider>
    </div>
  </div>
}

export default Demo;