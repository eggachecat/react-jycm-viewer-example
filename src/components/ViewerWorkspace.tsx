import * as React from "react";
import { JYCMContext, JYCMRender, useJYCM } from "react-jycm-viewer";

type ViewerWorkspaceProps = {
  leftValue: unknown;
  rightValue: unknown;
  diffValue: any;
};

const STANDARD_EVENTS = new Set([
  "dict:add",
  "dict:remove",
  "list:add",
  "list:remove",
  "value_changes",
]);

function summarize(diffValue: any) {
  let changes = 0;
  let ruleChecks = 0;
  let violations = 0;
  Object.entries(diffValue || {}).forEach(([event, value]) => {
    if (event === "just4vis:pairs" || !Array.isArray(value)) return;
    if (STANDARD_EVENTS.has(event)) changes += value.length;
    else {
      ruleChecks += value.length;
      violations += value.filter((record: any) => record.pass === false).length;
    }
  });
  return { changes, ruleChecks, violations, equal: changes + violations === 0 };
}

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
  const summary = React.useMemo(() => summarize(diffValue), [diffValue]);

  return (
    <JYCMContext.Provider value={contextValue}>
      <section className="business-summary" aria-label="Business diff summary">
        <strong className={summary.equal ? "pass" : "fail"}>
          {summary.equal ? "Semantically equal" : "Review required"}
        </strong>
        <span>{summary.changes} changes</span>
        <span>{summary.ruleChecks} rule checks</span>
        <span>{summary.violations} violations</span>
      </section>
      <div className="viewer-workspace">
        <JYCMRender leftTitle="Benchmark" rightTitle="Actual" />
      </div>
    </JYCMContext.Provider>
  );
}
