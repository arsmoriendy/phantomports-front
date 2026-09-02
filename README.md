# PhantomPorts Front

> [!warning]
> This project has been migrated to [this repository](https://github.com/arsmoriendy/opor-next)

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
