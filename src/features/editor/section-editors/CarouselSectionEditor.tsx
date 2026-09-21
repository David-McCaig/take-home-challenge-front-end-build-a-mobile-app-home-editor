import { Link, Plus, X } from "lucide-react"

import { Input } from "@/components/ui/input"
import type { CarouselSection } from "@/types/section.types"

function ImageField({ number, url }: { number: number; url: string }) {
  return (
    <fieldset className="w-full min-w-0 rounded-xl border p-2.5 shadow-sm">
      <legend className="sr-only">Image {number}</legend>
      <div className="flex items-center gap-2">
        <span className="flex size-5 items-center justify-center rounded-full bg-muted text-[0.65rem] text-muted-foreground">
          {number}
        </span>
        <span className="text-xs font-medium">Image {number}</span>
        <button
          type="button"
          aria-label={`Remove image ${number}`}
          className="ml-auto rounded-sm text-muted-foreground focus-visible:outline-2"
        >
          <X className="size-3.5" aria-hidden="true" />
        </button>
      </div>
      <label className="relative mt-2 block">
        <span className="sr-only">Image {number} URL</span>
        <Link className="absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <Input
          type="url"
          defaultValue={url}
          className="h-10 pl-8 text-xs"
        />
      </label>
    </fieldset>
  )
}

export function CarouselSectionEditor({ section }: { section: CarouselSection }) {
  return (
    <>
      <div className="mt-4">
        <p className="text-xs text-muted-foreground">Images ({section.images.length})</p>
        <div className="mt-2 space-y-2">
          {section.images.map((image, index) => (
            <ImageField key={image.id} number={index + 1} url={image.url} />
          ))}
        </div>
      </div>

      <button
        type="button"
        className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-dashed text-xs text-muted-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <Plus className="size-4" aria-hidden="true" />
        Add image
      </button>

      <label className="mt-4 block text-xs text-muted-foreground">
        View mode
        <select defaultValue={section.aspectRatio} className="mt-2 h-10 w-full rounded-lg border bg-background px-3 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2">
          <option value="portrait">Portrait</option>
          <option value="landscape">Landscape</option>
          <option value="square">Square</option>
        </select>
      </label>
    </>
  )
}
