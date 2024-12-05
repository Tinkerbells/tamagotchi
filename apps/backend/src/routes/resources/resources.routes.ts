import {
  insertResourcesSchema,
  updateResourcesSchema,
  selectResourcesSchema,
} from '@/db/schema'
import { notFoundSchema } from '@/lib/constants'
import { createRoute } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema, IdParamsSchema } from 'stoker/openapi/schemas'

const tags = ['Resources']

export const create = createRoute({
  path: '/resources',
  method: 'post',
  request: {
    body: jsonContentRequired(insertResourcesSchema, 'The resources create'),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      insertResourcesSchema,
      'The created resources'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertResourcesSchema),
      'The validation error(s)'
    ),
  },
})

export const update = createRoute({
  path: '/resources/{id}',
  method: 'patch',
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(updateResourcesSchema, 'The resources update'),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      updateResourcesSchema,
      'The updated resources'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'Resources not found'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(updateResourcesSchema),
      'The validation error(s)'
    ),
  },
})

export const get = createRoute({
  path: '/resources/{id}',
  method: 'get',
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectResourcesSchema,
      'The requested resources'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'Resources not found'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      'Invalid id error'
    ),
  },
})

export type GetRoute = typeof get
export type CreateRoute = typeof create
export type UpdateRoute = typeof update
