import { t, TSchema } from "elysia";

export const DEFAULT_LIMIT = 20;
export const MAX_LIMIT = 100;

export const paginationSchema = t.Object({
  limit: t.Numeric({ minimum: 1, maximum: MAX_LIMIT, default: DEFAULT_LIMIT}),
  offset: t.Numeric({ minimum: 0, default: 0 }),
}, {
  additionalProperties: false
})

export const paginationMetaSchema = t.Object({
  current_page: t.Number(),
  per_page: t.Number(),
  total_items: t.Number(),
  total_pages: t.Number(),
});

export const paginationLinksSchema = t.Object({
  self: t.String(),
  next: t.Nullable(t.String()),
  prev: t.Nullable(t.String()),
  last: t.String(),
});

export const paginatedSchema = <T extends TSchema>(schema: T) => t.Object({
  data: t.Array(schema),
  meta: paginationMetaSchema,
  links: paginationLinksSchema,
})

export type Pagination = typeof paginationSchema.static;

export function normalizePagination({ limit, offset }: Pagination) {
  return {
    limit: Math.min(Math.max(1, limit), MAX_LIMIT),
    offset: Math.max(0, offset),
  };
}

export function buildPaginatedResponse<T>(
  data: T[],
  total: number,
  limit: number,
  offset: number,
  baseUrl: string,
) {
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);
  const hasNext = offset + limit < total;
  const hasPrev = offset > 0;

  const buildUrl = (o: number) => {
    const url = new URL(baseUrl);
    url.searchParams.set("limit", String(limit))
    url.searchParams.set("offset", String(o))
    return url.toString();
  }

  return {
    data,
    meta: {
      current_page: currentPage,
      per_page: limit,
      total_items: total,
      total_pages: totalPages,
    },
    links: {
      self: buildUrl(offset),
      next: hasNext ? buildUrl(offset + limit) : null,
      prev: hasPrev ? buildUrl(Math.max(0, offset - limit)) : null,
      last: buildUrl((totalPages - 1) * limit),
    },
  };
}