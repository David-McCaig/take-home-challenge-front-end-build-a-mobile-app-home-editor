import { Input } from "@/components/ui/input"

export function CTASectionEditor() {
  return (
    <div className="mt-4 space-y-4">
      <label className="block text-xs text-muted-foreground">
        Label
        <Input defaultValue="Shop Now" className="mt-2 text-foreground" />
      </label>
      <label className="block text-xs text-muted-foreground">
        Link
        <Input type="url" defaultValue="https://example.com/shop" className="mt-2 text-foreground" />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="text-xs text-muted-foreground">
          Button color
          <Input type="color" defaultValue="#000000" className="mt-2" />
        </label>
        <label className="text-xs text-muted-foreground">
          Label color
          <Input type="color" defaultValue="#ffffff" className="mt-2" />
        </label>
      </div>
    </div>
  )
}
