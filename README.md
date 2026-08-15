# react-jycm-viewer example

A runnable React and TypeScript reference for [react-jycm-viewer](https://github.com/eggachecat/react-jycm-viewer), the synchronized visual viewer for JYCM semantic JSON diffs.

Unlike a plain text diff, JYCM can describe business-aware relationships such as array items matched by an `id`, path-specific unordered collections, ignored values, additions, removals, and nested value changes. This project shows how to feed that structured result into the low-level provider and renderer APIs using real editable JSON.

## Run locally

```bash
pnpm install
pnpm start
```

Open `http://localhost:8080`. Edit any of the three inputs; temporarily invalid JSON keeps the last valid visualization visible.

Validate a change with:

```bash
pnpm run check
```

## Integration pattern

```tsx
import { JYCMContext, JYCMRender, useJYCM } from "react-jycm-viewer";

function DiffView({ before, after, diffResult }) {
  const viewer = useJYCM({
    leftJsonStr: JSON.stringify(before, null, 2),
    rightJsonStr: JSON.stringify(after, null, 2),
    diffResult,
  });

  return (
    <JYCMContext.Provider value={viewer}>
      <JYCMRender leftTitle="Benchmark" rightTitle="Actual" />
    </JYCMContext.Provider>
  );
}
```

The complete editable implementation is in `src/components/Demo.tsx`; Monaco's JSON worker configuration is in `configs/webpack/common.js`.

## Where the diff comes from

- [JYCM for Python](https://github.com/eggachecat/jycm) generates semantic diff results and RFC 6902 patches.
- [JYCM for JavaScript](https://github.com/eggachecat/jycm-js) generates the same class of structured result in browser or Node.js workflows.
- [react-jycm-viewer](https://github.com/eggachecat/react-jycm-viewer) turns the result into synchronized, navigable source views.

MIT licensed.
