import { z } from "zod"

import type { AppConfig } from "../types/config.types"
import { sectionSchema } from "./section.schema"

export const appConfigSchema = z
  .object({
    version: z.literal(1),
    sections: z.array(sectionSchema),
  })
  .strict() satisfies z.ZodType<AppConfig>
