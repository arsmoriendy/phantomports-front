import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Get_PortsQuery } from "@/__generated__/graphql";
import { InlineCode } from "./typography";

type QueryTableProps = HTMLAttributes<HTMLTableElement> & {
  data: Get_PortsQuery
}

type PortQuery = Get_PortsQuery["ports"][0]
type PortQueryKey = keyof PortQuery
type PortQueryValue = PortQuery[PortQueryKey]

/** Ports field formatter map. */
// TODO: sync `PortQueryKey` (i.e. make it concrete) so ts knows the type of `input`
const fmtmap = new Map<PortQueryKey, (input: PortQuery[PortQueryKey]) => ReactNode>()

// INFO: null should indicate to not render field at all
// i.e. do not render the field `__typename`
fmtmap.set("__typename", () => null)

// HACK: redundant type checking (using instanceof) so ts doesn't complain
fmtmap.set("portNumber", (pn) => pn instanceof Array && (pn as Array<number>).length > 1
  ? `${pn[0]}-${pn[pn.length - 1]}`
  : pn)
fmtmap.set("serviceName", (s) => s || "-")
fmtmap.set("transportProtocol", (tp) => tp || "-")

export const QueryTable = forwardRef<HTMLTableElement, QueryTableProps>(({ data, ...props }, ref) => {
  const heads = Object
    .keys(data.ports[0])
    .filter(stripTypeName)
    .map(head => <TableHead key={head}>{head.charAt(0).toUpperCase() + head.slice(1)}</TableHead>)

  let rkey = 0
  const rows = data.ports.map(row =>
    <TableRow key={rkey++}>
      { // map fields of each row
        Object
          .entries(row)
          .map(v => formatField(v[0] as PortQueryKey, v[1]))
      }
    </TableRow>
  )

  function stripTypeName<T>(v: T) { return v !== "__typename" }
  function formatField(key: PortQueryKey, value: PortQueryValue) {
    const formatter = fmtmap.get(key)
    let formattedValue = formatter === undefined
      ? value // use unformatted value
      : formatter(value);
    return formattedValue !== null
      && <TableCell key={key}>{formattedValue}</TableCell>
  }

  const d = new Date(data.lastChecked * 1000)
  const dstr = `${d.getFullYear().toString().slice(-2)}/${d.getMonth()}/${d.getDate()}`
  const tstr = `${d.getHours()}:${d.getMinutes()}`

  return <Table ref={ref} {...props}>
    <TableCaption className="align-middle">
      Last checked on <span className="font-mono font-semibold text-xs">{dstr}</span> at <span className="font-mono font-semibold text-xs">{tstr}</span>
    </TableCaption>
    <TableHeader>
      <TableRow>{heads}</TableRow>
    </TableHeader>
    <TableBody>
      {rows}
    </TableBody>
  </Table>
})
