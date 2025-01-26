import {
  insertNormsSchema,
  updateNormsSchema,
  selectNormsSchema,
  selectResourcesSchema,
  getResourcesSchema,
  getResourcesStatisticsSchema,
} from '@/db/schema'
import { forbiddenSchema } from '@/lib/constants'
import { createRoute } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema, IdParamsSchema } from 'stoker/openapi/schemas'

const tags = ['Resources']

export const create = createRoute({
  path: '/resources',
  method: 'post',
  request: {
    body: jsonContentRequired(insertNormsSchema, 'The resources create'),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      insertNormsSchema,
      'The created resources'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertNormsSchema),
      'The validation error(s)'
    ),
  },
})

export const update = createRoute({
  path: '/resources/{id}',
  method: 'patch',
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(updateNormsSchema, 'The resources update'),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      updateNormsSchema,
      'The updated resources'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      forbiddenSchema,
      'Resources not found'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(updateNormsSchema),
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
      getResourcesSchema,
      'The requested resources'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      forbiddenSchema,
      'Resources not found'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      'Invalid id error'
    ),
  },
})

export const getStatistics = createRoute({
  path: '/resources/statistics/{id}',
  method: 'get',
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      getResourcesStatisticsSchema,
      'The requested resources statistics'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      forbiddenSchema,
      'Resources statistics not found'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      'Invalid id error'
    ),
  },
})

export type GetRoute = typeof get
export type GetStatisticsRoute = typeof getStatistics
export type CreateRoute = typeof create
export type UpdateRoute = typeof update
