# StudyCentral Frontend V2

## Planned Name Changes

This section tracks names that currently work but should be renamed later for better consistency and clarity.

| Current name | Suggested name | Reason | Status |
| --- | --- | --- | --- |
| `profilePictureUrl` | `profilePictureBlobName` | Returns the blob name, not a full image URL. The frontend builds the actual image URL with `imageApi.getImageUrl(...)`. | Later |



## Dependencies
- React Router : `react-router-dom`
- Chakra UI : `@chakra-ui/react`
- Emotion React : `@emotion/react`
- TanStack Query : `@tanstack/react-query`
- Axios : `axios`
- Zustand : `zustand`
- Zod : `zod`
- React Hook Form : `react-hook-form`
- Hookform Resolvers : `@hookform/resolvers`
- React Icons : `react-icons`
- SignalR Client : `@microsoft/signalr`

## Dev Dependencies

- Node Types : `@types/node`

## Dependencies that might be useful

- Date-fns : `date-fns`
  - Useful for formatting deadlines, submission dates, chat timestamps, and calendar/week views.

- TanStack Query Devtools : `@tanstack/react-query-devtools`
  - Useful during development for inspecting query state, cached data, loading states, and refetching.

- Lucide React : `lucide-react`
  - Useful if you want cleaner modern icons than React Icons.

- Clsx : `clsx`
  - Useful for conditional class names if some components use CSS classes.

- File Saver : `file-saver`
  - Useful if the frontend needs to manually download files from API/blob responses.

- UUID : `uuid`
  - Useful if the frontend needs temporary IDs for optimistic UI, such as chat messages before the backend responds.

- Day.js : `dayjs`
  - Alternative to Date-fns for simple date formatting. Pick either Date-fns or Day.js, not both.

## Install Command

```powershell
npm install react-router-dom @chakra-ui/react @emotion/react @tanstack/react-query axios zustand zod react-hook-form @hookform/resolvers react-icons @microsoft/signalr
npm install -D @types/node


