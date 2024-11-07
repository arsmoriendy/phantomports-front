import {
  ApolloClient,
  ApolloError,
  ApolloProvider,
  InMemoryCache,
  useQuery,
} from "@apollo/client";
import { FormEvent, forwardRef, HTMLAttributes, useState } from "react";
import { gql } from "@/__generated__/gql";
import { QueryTable } from "./query-table";
import { Alert, AlertDescription, AlertProps, AlertTitle } from "../ui/alert";
import { BadgeAlert, BadgeCheck, Loader } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { InlineCode } from "./typography";
import { Separator } from "../ui/separator";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export const client = new ApolloClient({
  uri: import.meta.env.VITE_GQL_SRV_URI,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Basic ${btoa(`:${import.meta.env.VITE_GQL_SRV_PASS}`)}`,
  },
});

export const QueryForm = forwardRef<
  HTMLFormElement,
  HTMLAttributes<HTMLFormElement>
>(({ ...props }, ref) => {
  const [portStr, setPortStr] = useState("");
  const [portNum, setPortNum] = useState<number | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setPortNum(parseInt(portStr));
  };

  return (
    <ApolloProvider client={client}>
      <form ref={ref} onSubmit={onSubmit} {...props}>
        <InputOTP
          name="port"
          pattern={REGEXP_ONLY_DIGITS}
          value={portStr}
          maxLength={portStr.length + 1}
          onChange={(value) => setPortStr(value)}
        >
          <div className="flex gap-6 items-center">
            <div>
              <label htmlFor="port">Port Number</label>
              <label
                className="block text-muted-foreground text-sm"
                htmlFor="port"
              >
                Press enter to search
              </label>
            </div>
            <InputOTPGroup>
              {[...portStr, ""].map((_, i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </div>
        </InputOTP>
        <Button
          className="mt-3"
          type="submit"
          size="sm"
          disabled={portStr.length === 0}
        >
          Search
        </Button>
      </form>
      {portNum !== null && <QueryResult portNum={portNum} />}
    </ApolloProvider>
  );
});

const GET_PORTS = gql(/* GraphQL */ `
  query GET_PORTS($portNum: Int!) {
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
`);

const QueryResultAlert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, ...props }, ref) => (
    <Alert ref={ref} className={cn(className, "my-6")} {...props} />
  ),
);

const ErrorIndicator = ({ error }: { error: ApolloError }) => (
  <QueryResultAlert variant={"destructive"}>
    <BadgeAlert className="h-4 w-4" />
    <AlertTitle>
      Error fetching <b>API</b>
    </AlertTitle>
    <AlertDescription>
      Message: <InlineCode className="text-xs">{error.message}</InlineCode>
    </AlertDescription>
  </QueryResultAlert>
);

const LoadingIndicator = () => (
  <Skeleton className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold mt-6">
    <Loader className="animate-spin w-4 h-4 mr-1.5" />
    loading...
  </Skeleton>
);

const QueryResult = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { portNum: number }
>(({ portNum, ...props }, ref) => {
  const { loading, error, data } = useQuery(GET_PORTS, {
    variables: { portNum },
  });

  // filter unnasigned ports
  const ports = data?.ports.filter((p) => p.description !== "Unassigned");

  let dstr = "",
    tstr = "";

  if (data !== undefined) {
    const d = new Date(data.lastChecked * 1000);
    dstr = d.toLocaleDateString(undefined, { dateStyle: "medium" });
    tstr = d.toLocaleTimeString(undefined, { timeStyle: "short" });
  }

  return loading ? (
    <LoadingIndicator />
  ) : error !== undefined ? (
    <ErrorIndicator error={error} />
  ) : (
    <div ref={ref} {...props}>
      {ports?.length === 0 ? ( // Unregistered
        <>
          <QueryResultAlert>
            <BadgeCheck className="w-4 h-4" />
            <AlertTitle>
              Port <b>{portNum}</b> is unregistered
            </AlertTitle>
            <AlertDescription>
              If you want to register this port, check out{" "}
              <a href="https://www.iana.org/protocols/apply">
                IANA's port registration forms
              </a>
            </AlertDescription>
          </QueryResultAlert>
        </>
      ) : (
        // Registered
        <>
          <QueryResultAlert variant={"destructive"}>
            <BadgeAlert className="w-4 h-4" />
            <AlertTitle>
              Port <b>{portNum}</b> is registered
            </AlertTitle>
            <AlertDescription>
              <p>Registration details listed in the table below.</p>
              {(data!.nextOpenPort || data!.prevOpenPort) && (
                <>
                  <Separator className="my-1.5 bg-destructive/20 dark:bg-primary/20" />
                  Suggested open ports:
                  {data!.nextOpenPort && (
                    <InlineCode copy tooltip="Next port, click to copy">
                      {data!.nextOpenPort}
                    </InlineCode>
                  )}
                  &nbsp;
                  {data!.prevOpenPort && (
                    <InlineCode copy tooltip="Previous port, click to copy">
                      {data!.prevOpenPort}
                    </InlineCode>
                  )}
                </>
              )}
            </AlertDescription>
          </QueryResultAlert>
          <QueryTable data={data!} />
        </>
      )}
      <small className="text-sm text-muted-foreground block text-center mt-4">
        Last checked on{" "}
        <span className="font-mono font-semibold text-xs">{dstr}</span> at{" "}
        <span className="font-mono font-semibold text-xs">{tstr}</span>
      </small>
    </div>
  );
});
