import { z } from "zod"

import type { Section } from "../types/section.types"

const idSchema = z.string().min(1)
const colorSchema = z
  .string()
  .regex(/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i, "Must be a three- or six-digit hex color")

export const carouselSectionSchema = z
  .object({
    id: idSchema,
    type: z.literal("carousel"),
    images: z.array(
      z
        .object({
          id: idSchema,
          url: z.string().url(),
        })
        .strict(),
    ),
    aspectRatio: z.enum(["portrait", "landscape", "square"]),
  })
  .strict()

export const textareaSectionSchema = z
  .object({
    id: idSchema,
    type: z.literal("textarea"),
    title: z.string(),
    description: z.string(),
    titleColor: colorSchema,
    descriptionColor: colorSchema,
  })
  .strict()

export const ctaSectionSchema = z
  .object({
    id: idSchema,
    type: z.literal("cta"),
    label: z.string(),
    href: z.string().url(),
    buttonColor: colorSchema,
    textColor: colorSchema,
  })
  .strict()

export const sectionSchema = z.discriminatedUnion("type", [
  carouselSectionSchema,
  textareaSectionSchema,
  ctaSectionSchema,
]) satisfies z.ZodType<Section>
