import type { AnyFieldMeta } from '@tanstack/react-form'
import type { ZodError } from 'zod/v4'

interface FieldInfoProps {
  fieldName: string
  meta: AnyFieldMeta
}

export default function FieldInfo({ fieldName, meta }: FieldInfoProps) {
  return (
    <>
      {meta.isTouched && !meta.isValid
        ? meta.errors.map(({ message, name }: ZodError) => (
            <p
              className="text-sm font-medium text-destructive"
              id={`${fieldName}-error`}
              key={`${fieldName}-${name}`}
              role="alert">
              {message}
            </p>
          ))
        : null}
      {/* {field.state.meta.isValidating ? 'Validating...' : null} */}
    </>
  )
}
