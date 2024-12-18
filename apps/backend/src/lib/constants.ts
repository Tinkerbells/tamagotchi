import * as HttpStatusPhrases from 'stoker/http-status-phrases'
import { createMessageObjectSchema } from 'stoker/openapi/schemas'

export const ZOD_ERROR_MESSAGES = {
  REQUIRED: 'Required',
  EXPECTED_NUMBER: 'Expected number, received nan',
  NO_UPDATES: 'No updates provided',
}

export const ZOD_ERROR_CODES = {
  INVALID_UPDATES: 'invalid_updates',
}

export const notFoundSchema = createMessageObjectSchema(
  HttpStatusPhrases.NOT_FOUND
)

export const forbiddenSchema = createMessageObjectSchema(
  HttpStatusPhrases.FORBIDDEN
)

export const badRequestSchema = createMessageObjectSchema(
  HttpStatusPhrases.BAD_REQUEST
)

export const UnauthorizedSchema = createMessageObjectSchema(
  HttpStatusPhrases.UNAUTHORIZED
)
