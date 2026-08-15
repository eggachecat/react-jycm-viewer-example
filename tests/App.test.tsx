import * as React from "react";
import * as ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

import App from "../src/components/App";
import ViewerWorkspace from "../src/components/ViewerWorkspace";

const render = (element: React.ReactElement) => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  act(() => {
    ReactDOM.render(element, container);
  });
  return container;
};

const cleanup = (container: HTMLDivElement) => {
  act(() => {
    ReactDOM.unmountComponentAtNode(container);
  });
  container.remove();
};

it("renders the runnable integration example", () => {
  const container = render(<App />);

  expect(container.textContent).toContain(
    "Render semantic JSON changes in React",
  );
  expect(container.querySelectorAll("textarea")).toHaveLength(3);
  expect(container.textContent).toContain("Loading synchronized viewer");

  cleanup(container);
});

it("wires data into the low-level viewer API", () => {
  const container = render(
    <ViewerWorkspace
      leftValue={{ id: 1 }}
      rightValue={{ id: 2 }}
      diffValue={{}}
    />,
  );

  expect(container.textContent).toContain("Synchronized JYCM viewer");
  expect(container.textContent).toContain("Benchmark / Actual");

  cleanup(container);
});
