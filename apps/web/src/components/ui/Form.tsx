'use client';

import * as React from 'react';
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form';

import { cn } from '@/lib/cn';

// ---------------------------------------------------------------------------
// Form (re-export of FormProvider)
// ---------------------------------------------------------------------------
const Form = FormProvider;

// ---------------------------------------------------------------------------
// FormField Context
// ---------------------------------------------------------------------------
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

// ---------------------------------------------------------------------------
// FormField — delegates to Controller and provides name context
// ---------------------------------------------------------------------------
function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// FormItem Context (for connecting label ↔ input ↔ error via IDs)
// ---------------------------------------------------------------------------
type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

// ---------------------------------------------------------------------------
// useFormField — internal hook consumed by Form* components
// ---------------------------------------------------------------------------
function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField must be used within a <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-description`,
    formMessageId: `${id}-form-message`,
    ...fieldState,
  };
}

// ---------------------------------------------------------------------------
// FormItem — wrapper div with spacing, provides item context with unique ID
// ---------------------------------------------------------------------------
const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = 'FormItem';

// ---------------------------------------------------------------------------
// FormLabel — label that turns red on error
// ---------------------------------------------------------------------------
const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <label
      ref={ref}
      htmlFor={formItemId}
      className={cn(
        'text-text-primary text-sm font-medium',
        error && 'text-red-600 dark:text-red-400',
        className
      )}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';

// ---------------------------------------------------------------------------
// FormControl — wraps the actual input, wires aria-* attributes
// ---------------------------------------------------------------------------
const FormControl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <div
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = 'FormControl';

// ---------------------------------------------------------------------------
// FormDescription — muted helper text below a field
// ---------------------------------------------------------------------------
const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn('text-text-secondary text-xs', className)}
      {...props}
    />
  );
});
FormDescription.displayName = 'FormDescription';

// ---------------------------------------------------------------------------
// FormMessage — displays field error message inline
// ---------------------------------------------------------------------------
const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      role="alert"
      className={cn(
        'text-xs font-medium text-red-600 dark:text-red-400',
        className
      )}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = 'FormMessage';

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------
export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
};
