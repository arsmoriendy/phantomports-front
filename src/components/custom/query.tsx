import { ApolloClient, ApolloError, ApolloProvider, InMemoryCache, useQuery } from "@apollo/client";
import { forwardRef, HTMLAttributes, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { gql } from "@/__generated__/gql";
import { QueryTable } from "./query-table";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { BadgeAlert, BadgeCheck, Loader } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { InlineCode } from "./typography";

export const client = new ApolloClient({
  uri: import.meta.env.VITE_GQL_SRV_URI,
  cache: new InMemoryCache()
})

export const QueryForm = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ ...props }, ref) => {
  const [portNum, setPortNum] = useState<number>(NaN)

  const input = useRef<HTMLInputElement>(null)

  const updatePortNum = () => { setPortNum(parseInt(input.current?.value ?? "NaN")) }

  return <ApolloProvider client={client}>
    <div ref={ref} className={cn('flex space-x-1.5', props.className)} {...props}>
      <Input
        ref={input}
        type='number'
        placeholder='Port number (E.g. 80)'
        onKeyUp={(e) => e.key === "Enter" && updatePortNum()}
        className="max-w-[17em]"
      />
      <Button onClick={updatePortNum}>Lookup</Button>
    </div>

    {!isNaN(portNum) && <>
      <QueryResult portNum={portNum} className="mt-6" />
    </>}
  </ApolloProvider>
})

const GET_PORTS = gql(/* GraphQL */ `
  query GET_PORTS($portNum: Int!){
    ports(portNumber: $portNum) {
      serviceName
      transportProtocol
      portNumber
      description
    }
    lastChecked
    nextOpenPort(portNumber: $portNum)
    prevOpenPort(portNumber: $portNum)
  }
`)

const QueryResult = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { portNum: number }>(({ portNum, ...props }, ref) => {
  const { loading, error, data } = useQuery(GET_PORTS, { variables: { portNum } });

  // filter unnasigned ports
  const ports = data?.ports.filter(p => p.description !== "Unassigned")

  const LoadingIndicator = () => <Skeleton
    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold mt-6">
    <Loader className="animate-spin w-4 h-4 mr-1.5" />loading...
  </Skeleton>

  const ErrorIndicator = ({ error }: { error: ApolloError }) => <Alert
    variant={"destructive"}
    className="mt-6">
    <BadgeAlert className="h-4 w-4" />
    <AlertTitle>Error fetching <b>API</b></AlertTitle>
    <AlertDescription>
      Message: <InlineCode className="text-xs">{error.message}</InlineCode>
    </AlertDescription>
  </Alert>

  return loading ? <LoadingIndicator /> : error !== undefined ? <ErrorIndicator error={error} /> : <div ref={ref} {...props}>
    {
      ports?.length === 0 ? // Unregistered
        <>
          <Alert variant={"success"}>
            <BadgeCheck className="w-4 h-4" />
            <AlertTitle>
              Port <b>{portNum}</b> is unregistered
            </AlertTitle>
            <AlertDescription>
              If you want to register this port,
              check out <a className="dark:text-blue-500" href="https://www.iana.org/protocols/apply">
                IANA's port registration forms
              </a>
            </AlertDescription>
          </Alert>
        </>
        : // Registered
        <>
          <Alert variant={"destructive"}>
            <BadgeAlert className="w-4 h-4" />
            <AlertTitle>Port <b>{portNum}</b> is registered</AlertTitle>
            <AlertDescription>
              Registration details listed in the table below.
            </AlertDescription>
          </Alert>
          <QueryTable data={data!} />
        </>
    }
  </div>
})