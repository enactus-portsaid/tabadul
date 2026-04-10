import { z } from 'zod';

// ---------------------------------------------------------------------------
// Sign-In Schema
// ---------------------------------------------------------------------------
export const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'auth.validation.emailRequired')
    .email('auth.validation.emailInvalid'),
  password: z
    .string()
    .min(1, 'auth.validation.passwordRequired'),
});

export type SignInInput = z.infer<typeof signInSchema>;

// ---------------------------------------------------------------------------
// Sign-Up Schema
// ---------------------------------------------------------------------------
export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, 'auth.validation.emailRequired')
      .email('auth.validation.emailInvalid'),
    password: z
      .string()
      .min(8, 'auth.validation.passwordMinLength')
      .regex(/[A-Z]/, 'auth.validation.passwordUppercase')
      .regex(/[a-z]/, 'auth.validation.passwordLowercase')
      .regex(/[0-9]/, 'auth.validation.passwordNumber'),
    confirmPassword: z
      .string()
      .min(1, 'auth.validation.confirmPasswordRequired'),
    fullName: z
      .string()
      .min(2, 'auth.validation.fullNameMinLength')
      .max(100, 'auth.validation.fullNameMaxLength'),
    companyName: z
      .string()
      .min(2, 'auth.validation.companyNameMinLength')
      .max(200, 'auth.validation.companyNameMaxLength'),
    role: z.enum(['buyer', 'seller'], {
      required_error: 'auth.validation.roleRequired',
    }),
    phone: z
      .string()
      .min(1, 'auth.validation.phoneRequired')
      .regex(
        /^(\+20|0)?1[0-9]{9}$/,
        'auth.validation.phoneInvalid'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'auth.validation.passwordMismatch',
    path: ['confirmPassword'],
  });

export type SignUpInput = z.infer<typeof signUpSchema>;

// ---------------------------------------------------------------------------
// Update Profile Schema
// ---------------------------------------------------------------------------
export const updateProfileSchema = z.object({
  full_name: z
    .string()
    .min(2, 'auth.validation.fullNameMinLength')
    .max(100, 'auth.validation.fullNameMaxLength')
    .optional(),
  company_name: z
    .string()
    .min(2, 'auth.validation.companyNameMinLength')
    .max(200, 'auth.validation.companyNameMaxLength')
    .optional(),
  phone: z
    .string()
    .regex(
      /^(\+20|0)?1[0-9]{9}$/,
      'auth.validation.phoneInvalid'
    )
    .optional(),
  avatar_url: z.string().url().optional().nullable(),
  location: z.string().max(255).optional(),
  bio: z.string().max(500).optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

// ---------------------------------------------------------------------------
// Password Reset Schema
// ---------------------------------------------------------------------------
export const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'auth.validation.emailRequired')
    .email('auth.validation.emailInvalid'),
});

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

// ---------------------------------------------------------------------------
// Update Password Schema
// ---------------------------------------------------------------------------
export const updatePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'auth.validation.passwordMinLength')
      .regex(/[A-Z]/, 'auth.validation.passwordUppercase')
      .regex(/[a-z]/, 'auth.validation.passwordLowercase')
      .regex(/[0-9]/, 'auth.validation.passwordNumber'),
    confirmPassword: z
      .string()
      .min(1, 'auth.validation.confirmPasswordRequired'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'auth.validation.passwordMismatch',
    path: ['confirmPassword'],
  });

export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
