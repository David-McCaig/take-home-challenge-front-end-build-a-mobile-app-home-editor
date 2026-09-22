import { useRef, useState, type Ref } from "react"
import { Link, Plus, X } from "lucide-react"

import { Input } from "@/components/ui/input"
import { useEditor } from "@/features/editor/hooks/useEditor"
import { httpUrlSchema } from "@/schemas/section.schema"
import type { CarouselImage, CarouselSection } from "@/types/section.types"
import { createId } from "@/utils/ids"

interface ImageFieldProps {
  number: number
  url: string
  inputRef?: Ref<HTMLInputElement>
  validationRequested?: boolean
  onChange?: (url: string) => void
  onCommit: (url: string) => void
  onRemove: () => void
}

function ImageField({
  number,
  url,
  inputRef,
  validationRequested = false,
  onChange,
  onCommit,
  onRemove,
}: ImageFieldProps) {
  const [urlDraft, setUrlDraft] = useState(url)
  const [showUrlError, setShowUrlError] = useState(false)
  const hasUrlError = showUrlError || validationRequested
  const errorId = `carousel-image-${number}-url-error`

  function commitUrl() {
    const isValid = httpUrlSchema.safeParse(urlDraft).success
    setShowUrlError(!isValid)
    if (isValid) onCommit(urlDraft)
  }

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
          onClick={onRemove}
          className="ml-auto cursor-pointer rounded-sm text-muted-foreground focus-visible:outline-2"
        >
          <X className="size-3.5" aria-hidden="true" />
        </button>
      </div>
      <label className="relative mt-2 block">
        <span className="sr-only">Image {number} URL</span>
        <Link className="absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <Input
          ref={inputRef}
          type="url"
          value={urlDraft}
          onChange={(event) => {
            const nextUrl = event.target.value
            setUrlDraft(nextUrl)
            setShowUrlError(false)
            onChange?.(nextUrl)
          }}
          onBlur={commitUrl}
          aria-invalid={hasUrlError}
          aria-describedby={hasUrlError ? errorId : undefined}
          className="h-10 pl-8 text-xs"
        />
      </label>
      {hasUrlError && (
        <p id={errorId} className="mt-2 text-xs text-destructive">
          Enter a valid HTTP or HTTPS URL.
        </p>
      )}
    </fieldset>
  )
}

export function CarouselSectionEditor({ section }: { section: CarouselSection }) {
  const { dispatch } = useEditor()
  const [pendingImages, setPendingImages] = useState<CarouselImage[]>([])
  const [showPendingError, setShowPendingError] = useState(false)
  const pendingInputRef = useRef<HTMLInputElement>(null)
  const images = [...section.images, ...pendingImages]
  const updateSection = (updates: Partial<CarouselSection>) =>
    dispatch({ type: "update-section", section: { ...section, ...updates } })

  return (
    <>
      <div className="mt-4">
        <p className="text-xs text-muted-foreground">Images ({images.length})</p>
        <div className="mt-2 space-y-2">
          {images.map((image, index) => {
            const isPending = pendingImages.some(({ id }) => id === image.id)

            return (
              <ImageField
                key={image.id}
                number={index + 1}
                url={image.url}
                inputRef={isPending ? pendingInputRef : undefined}
                validationRequested={isPending && showPendingError}
                onChange={
                  isPending
                    ? (url) => {
                        setShowPendingError(false)
                        setPendingImages([{ ...image, url }])
                      }
                    : undefined
                }
                onCommit={(url) => {
                  updateSection({
                    images: isPending
                      ? [...section.images, { ...image, url }]
                      : section.images.map((item) =>
                          item.id === image.id ? { ...item, url } : item,
                        ),
                  })
                  if (isPending) {
                    setShowPendingError(false)
                    setPendingImages((current) =>
                      current.filter(({ id }) => id !== image.id),
                    )
                  }
                }}
                onRemove={() => {
                  if (isPending) {
                    setShowPendingError(false)
                    setPendingImages((current) =>
                      current.filter(({ id }) => id !== image.id),
                    )
                  } else {
                    updateSection({
                      images: section.images.filter(({ id }) => id !== image.id),
                    })
                  }
                }}
              />
            )
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          const pendingImage = pendingImages[0]
          if (pendingImage && !httpUrlSchema.safeParse(pendingImage.url).success) {
            setShowPendingError(true)
            pendingInputRef.current?.focus()
            return
          }
          if (pendingImage) {
            updateSection({ images: [...section.images, pendingImage] })
          }
          setPendingImages([{ id: createId(), url: "" }])
        }}
        className="mt-3 flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed text-xs text-muted-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <Plus className="size-4" aria-hidden="true" />
        Add image
      </button>

      <label className="mt-4 block text-xs text-muted-foreground">
        View mode
        <select
          value={section.aspectRatio}
          onChange={(event) =>
            updateSection({
              aspectRatio: event.target.value as CarouselSection["aspectRatio"],
            })
          }
          className="mt-2 h-10 w-full rounded-lg border bg-background px-3 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <option value="portrait">Portrait</option>
          <option value="landscape">Landscape</option>
          <option value="square">Square</option>
        </select>
      </label>
    </>
  )
}
