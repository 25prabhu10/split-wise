import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useFormContext } from '@/contexts/form-context'

interface Props {
  label: string
}

export const SubmitButton = ({ label }: Props) => {
  const form = useFormContext()

  return (
    <form.Subscribe
      children={({ canSubmit, isSubmitting }) => (
        <Button disabled={isSubmitting || !canSubmit} type="submit">
          {label}
          {isSubmitting && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        </Button>
      )}
    />
  )
}
