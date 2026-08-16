import * as React from "react";

import {
  diffResult as initialDiffResult,
  leftJson,
  rightJson,
} from "./render-case/case-1";

const stringify = (value: unknown) => JSON.stringify(value, null, 2);
const ViewerWorkspace = React.lazy(() => import("./ViewerWorkspace"));

type JsonEditorProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function JsonEditor({ label, value, onChange }: JsonEditorProps) {
  return (
    <label className="json-editor">
      <span>{label}</span>
      <textarea
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        spellCheck={false}
      />
    </label>
  );
}

export default function Demo() {
  const [leftText, setLeftText] = React.useState(stringify(leftJson));
  const [rightText, setRightText] = React.useState(stringify(rightJson));
  const [diffText, setDiffText] = React.useState(stringify(initialDiffResult));
  const [leftValue, setLeftValue] = React.useState(leftJson);
  const [rightValue, setRightValue] = React.useState(rightJson);
  const [diffValue, setDiffValue] = React.useState(initialDiffResult);
  const [error, setError] = React.useState("");

  const updateJson = React.useCallback(
    (
      value: string,
      setText: (value: string) => void,
      setParsed: (value: any) => void,
    ) => {
      setText(value);
      try {
        setParsed(JSON.parse(value));
        setError("");
      } catch {
        setError("Keep typing - the viewer is holding the last valid JSON.");
      }
    },
    [],
  );

  return (
    <main>
      <header className="hero">
        <p className="eyebrow">Runnable integration example</p>
        <h1>Render semantic JSON changes in React</h1>
        <p>
          Edit the benchmark, actual response, or structured JYCM result. The
          synchronized viewer below highlights business-aware matches,
          additions, removals, and value changes.
        </p>
        <nav aria-label="Project links">
          <a href="https://github.com/eggachecat/react-jycm-viewer">
            Viewer package
          </a>
          <a href="https://github.com/eggachecat/jycm">Python core</a>
          <a href="https://github.com/eggachecat/jycm-js">JavaScript core</a>
        </nav>
      </header>

      <section className="editors" aria-label="JSON inputs">
        <JsonEditor
          label="Benchmark JSON"
          value={leftText}
          onChange={(value) => updateJson(value, setLeftText, setLeftValue)}
        />
        <JsonEditor
          label="Actual JSON"
          value={rightText}
          onChange={(value) => updateJson(value, setRightText, setRightValue)}
        />
        <JsonEditor
          label="JYCM diff result"
          value={diffText}
          onChange={(value) => updateJson(value, setDiffText, setDiffValue)}
        />
      </section>

      <p className={error ? "status status-error" : "status"} role="status">
        {error || "All inputs are valid. The synchronized view is up to date."}
      </p>

      <section className="viewer" aria-label="Synchronized diff viewer">
        <React.Suspense
          fallback={
            <p className="viewer-loading">Loading synchronized viewer...</p>
          }
        >
          <ViewerWorkspace
            leftValue={leftValue}
            rightValue={rightValue}
            diffValue={diffValue}
          />
        </React.Suspense>
      </section>
    </main>
  );
}
