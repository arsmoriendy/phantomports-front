import { cn } from "@/lib/utils"
import { forwardRef, HTMLAttributes } from "react"

type InlineCodeProps = HTMLAttributes<HTMLElement>
export const InlineCode = forwardRef<HTMLElement, InlineCodeProps>(({ className, ...props }, ref) => <code
  ref={ref}
  {...props}
  className={cn("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold", className)} />)
