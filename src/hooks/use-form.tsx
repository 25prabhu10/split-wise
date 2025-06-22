import { createFormHook } from '@tanstack/react-form'

import PasswordField from '@/components/form/password-field'
import { SubmitButton } from '@/components/form/submit-button'
import { TextField } from '@/components/form/text-field'
import { fieldContext, formContext } from '@/contexts/form-context'

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    PasswordField,
    TextField
  },
  fieldContext,
  formComponents: {
    SubmitButton
  },
  formContext
})
