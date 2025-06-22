import FieldInfo from '@/components/form/field-info'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFieldContext } from '@/contexts/form-context'

type TextFieldProps = React.ComponentProps<typeof Input> & { label: React.ReactNode }

export const TextField = ({ label, required, ...props }: TextFieldProps) => {
  const field = useFieldContext<string>()

  return (
    <div className="grid gap-2">
      <Label htmlFor={field.name}>
        {label}
        {required ? <span className="text-xs text-destructive">*</span> : ''}
      </Label>
      <Input
        aria-describedby={`${field.name}-error`}
        autoCapitalize="off"
        autoCorrect="off"
        id={field.name}
        name={field.name}
        onChange={(e) => {
          field.handleChange(e.target.value)
        }}
        required={required}
        value={field.state.value}
        {...props}
      />
      <FieldInfo fieldName={field.name} meta={field.state.meta} />
    </div>
  )
}
