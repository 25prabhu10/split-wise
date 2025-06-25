import type { AnyFieldMeta } from '@tanstack/react-form'
import type { $ZodIssue } from 'zod/v4/core'

interface FieldInfoProps {
  fieldName: string
  meta: AnyFieldMeta
}

export default function FieldInfo({ fieldName, meta }: FieldInfoProps) {
  return (
    <>
      {meta.isTouched && !meta.isValid
        ? meta.errors.map(({ code, message }: $ZodIssue) => (
            <p
              className="text-sm font-medium text-destructive"
              id={`${fieldName}-error`}
              key={`${fieldName}-${code}`}
              role="alert">
              {message}
            </p>
          ))
        : null}
      {meta.isValidating ? 'Validating...' : null}
    </>
  )
}
