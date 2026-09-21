import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-6 text-green-600" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-6 text-destructive" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "1rem",
          "--width": "28rem",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "!min-h-24 !gap-4 !rounded-2xl !border !border-foreground/70 !bg-background !px-6 !py-5 !pr-14 !text-foreground !shadow-xl",
          content: "gap-1",
          title: "!text-base !font-semibold !leading-tight",
          description: "!text-sm !leading-relaxed !text-muted-foreground",
          icon: "!m-0 shrink-0",
          closeButton:
            "!right-4 !left-auto !top-1/2 !size-8 !translate-x-0 !-translate-y-1/2 !border-0 !bg-transparent text-muted-foreground hover:text-foreground [&_svg]:size-5",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
