import { cn } from "@/lib/utils"
import { forwardRef, HTMLAttributes } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

type InlineCodeProps = HTMLAttributes<HTMLElement> & {
  // Toggle click to copy
  copy?: boolean
  tooltip?: string
}
export const InlineCode = forwardRef<HTMLElement, InlineCodeProps>(({ copy, className, tooltip, ...props }, ref) => {
  const code = <code
    ref={ref}
    onClick={copy ? () => { navigator.clipboard.writeText(props.children?.toString() ?? "") } : undefined}
    className={cn(`relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold`, className)}
    {...props}
  />
  return tooltip !== undefined ?
    <TooltipProvider><Tooltip>
      <TooltipTrigger>{code}</TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip></TooltipProvider>
    : code
})
