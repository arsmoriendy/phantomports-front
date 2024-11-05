# PhantomPorts Front

Front end for PhantomPorts.com using `react`, `vite` and `typescript`.

## Environment Variables

| Environment Variable Name | Description                                                                     |
| ------------------------- | ------------------------------------------------------------------------------- |
| `VITE_GQL_SRV_URI`        | [**REQUIRED**] The backend graphql api uri (e.g. `http://localhost:8080/query`) |
| `VITE_GQL_SRV_PASS`       | [**REQUIRED**] Password for the graphql api                                     |

## Generate graphql types

To regenerate graphql types use:

```bash
npx graphql-codegen
```

> [!NOTE]
> This repo was originally apart of [the archived monorepo](https://github.com/arsmoriendy/opor)
