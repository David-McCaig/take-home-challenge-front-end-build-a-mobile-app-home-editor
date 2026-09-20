import { PhonePreview } from "@/features/preview/PhonePreview"

export function PreviewPanel() {
  return (
    <section className="flex h-full flex-col rounded-2xl border p-4 sm:p-7 xl:min-h-[45rem]">
      <h2 className="text-base font-semibold">Preview</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        See your home screen update as you edit.
      </p>
      <div className="flex flex-1 items-start justify-center pt-7">
        <PhonePreview />
      </div>
    </section>
  )
}
