# Librarian Stories Collection

This collection is editorial content, not just structured data. Preserve the warmth, clarity, and grounded tone of the stories.

## Editing scope

- For metadata-only tasks, edit frontmatter only.
- Preserve story body content, embeds, images, links, and markdown formatting unless explicitly asked to change them.
- Do not normalize old inconsistencies just because you notice them.
- Do not reorder frontmatter in existing files.

## Frontmatter schema

```ts
schema: z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  fips: z.array(z.string()).optional(),
  location: z.array(z.string()),
})
```

## Field guidance

- `title` (required): the title of the article, usually the librarian’s name.
- `description` (required): an approximately 155-character description. This is shown to users on gallery cards and is fed to the meta description tag.
- `author` (required): the author of the article. This is often the librarian, but there are exceptions.
- `location` (required): an array of strings representing the librarian’s location or locations.
- `fips` (optional): an array of strings representing FIPS codes for the cities or states tied to the librarian’s locations.

## Description rules

Descriptions should:

- aim for roughly 155 characters
- sound as much like Sara as possible: warm, human, concrete, and plainspoken
- name the library when the story provides one
- usually include the librarian, the place, and the library or mission when possible
- work well both as gallery-card copy and as a meta description

Descriptions should avoid:

- generic SEO filler
- keyword stuffing
- vague praise that is not grounded in the story
- corporate or overly polished marketing language

## Location and FIPS guidance

- Preserve the current long-form location style already used in the collection.
- Do not normalize older entries to a new style unless explicitly asked.
- When adding a new file, follow the long-form style used by neighboring files until a stricter standard is chosen.
- If a city is not specified and the location is in the United States, use the full FIPS code for the whole state.
- If a librarian has multiple locations, include all relevant locations and FIPS values.

## Ordering rules

- Existing files: preserve the current frontmatter order.
- New files: use the schema order:
  1. `title`
  2. `description`
  3. `author`
  4. `fips`
  5. `location`

## Bulk-edit guidance

- When updating descriptions in bulk, scan for generic values beyond the literal string `"placeholder"`.
- Leave unrelated formatting and historical inconsistencies alone unless the task is specifically a cleanup pass.
