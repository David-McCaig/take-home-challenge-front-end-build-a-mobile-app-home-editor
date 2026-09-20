import { z } from "zod"

import type { AppConfig } from "../types/config.types"
import { sectionSchema } from "./section.schema"

export const appConfigSchema = z
  .object({
    version: z.literal(1),
    sections: z
      .array(sectionSchema)
      .refine(
        (sections) => new Set(sections.map((section) => section.id)).size === sections.length,
        "Section IDs must be unique",
      ),
  })
  .strict() satisfies z.ZodType<AppConfig>
