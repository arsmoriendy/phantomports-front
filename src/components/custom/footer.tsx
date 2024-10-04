import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { Button } from "../ui/button";
import { ArrowUp, Coffee } from "lucide-react";
import { Separator } from "../ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { GithubLogo } from "./github-logo";

type FooterProps = HTMLAttributes<HTMLDivElement>

export const Footer = forwardRef<HTMLDivElement, FooterProps>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("flex justify-center bg-secondary w-full", className)} {...props}>
    <div className="w-full lg:w-[768px] p-6">
      <div id="socialbar" className="flex space-x-1.5">
        <SocialBtn link="#" tooltip="Back to top">
          <ArrowUp className="h-4 w-4" />
        </SocialBtn>
        <SocialBtn link="https://github.com/arsmoriendy/phantomports-front" tooltip="Star on Github">
          <GithubLogo className="h-4 w-4" />
        </SocialBtn>
        <SocialBtn link="https://ko-fi.com/arsmoriendy" tooltip="Buy me a coffee">
          <Coffee className="h-4 w-4" />
        </SocialBtn>
      </div>

      <Separator className="my-3" />

      <small className='text-center text-muted-foreground'>
        Sourced from&nbsp;
        <a href='https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml' >
          IANA's Service Name and Transport Protocol Port Number Registry
        </a>
      </small>
    </div>
  </div>
})

const SocialBtn = ({ link, tooltip, children }: { link: string, tooltip: string, children: ReactNode }) =>
  <TooltipProvider><Tooltip>
    <TooltipTrigger asChild>
      <Button asChild variant={"outline"} size={"sm"} className="h-auto p-1.5">
        <a href={link} className="text-inherit">{children}</a>
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>{tooltip}</p>
    </TooltipContent>
  </Tooltip></TooltipProvider>
