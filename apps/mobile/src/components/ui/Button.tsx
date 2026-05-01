import { forwardRef } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { PressableProps, ViewStyle } from 'react-native';

// ---------------------------------------------------------------------------
// Button — Base interactive button for React Native
// ---------------------------------------------------------------------------

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  /** Visual style of the button */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /** Size preset */
  size?: 'sm' | 'md' | 'lg';
  /** Replaces children with a spinner and disables interaction */
  isLoading?: boolean;
  /** Icon rendered before the label */
  leftIcon?: React.ReactNode;
  /** Icon rendered after the label */
  rightIcon?: React.ReactNode;
  /** Full-width button */
  fullWidth?: boolean;
  /** Button label text */
  children: string;
}

const COLORS = {
  primary: '#1B4332',
  primaryLight: '#2D6A4F',
  white: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceMuted: '#FAF7F2',
  textPrimary: '#1A1A1A',
  border: '#E5E7EB',
  danger: '#DC2626',
  dangerDark: '#B91C1C',
};

export const Button = forwardRef<View, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <Pressable
        ref={ref}
        disabled={isDisabled}
        style={({ pressed }) => [
          styles.base,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && styles.fullWidth,
          pressed && !isDisabled && styles.pressed,
          isDisabled && styles.disabled,
          style as ViewStyle,
        ]}
        {...props}
      >
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color={
              variant === 'primary' || variant === 'danger'
                ? COLORS.white
                : COLORS.primary
            }
          />
        ) : (
          <View style={styles.content}>
            {leftIcon && <View style={styles.iconMargin}>{leftIcon}</View>}
            <Text
              style={[styles.label, labelVariantStyles[variant], labelSizeStyles[size]]}
            >
              {children}
            </Text>
            {rightIcon && <View style={styles.iconMargin}>{rightIcon}</View>}
          </View>
        )}
      </Pressable>
    );
  }
);

Button.displayName = 'Button';

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  fullWidth: {
    width: '100%',
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconMargin: {
    flexShrink: 0,
  },
  label: {
    fontWeight: '600',
  },
});

const variantStyles: Record<NonNullable<ButtonProps['variant']>, ViewStyle> = {
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: COLORS.danger,
  },
};

const sizeStyles: Record<NonNullable<ButtonProps['size']>, ViewStyle> = {
  sm: { height: 32, paddingHorizontal: 12 },
  md: { height: 40, paddingHorizontal: 16 },
  lg: { height: 48, paddingHorizontal: 24 },
};

const labelVariantStyles: Record<
  NonNullable<ButtonProps['variant']>,
  { color: string }
> = {
  primary: { color: COLORS.white },
  secondary: { color: COLORS.textPrimary },
  outline: { color: COLORS.primary },
  ghost: { color: COLORS.textPrimary },
  danger: { color: COLORS.white },
};

const labelSizeStyles: Record<
  NonNullable<ButtonProps['size']>,
  { fontSize: number }
> = {
  sm: { fontSize: 12 },
  md: { fontSize: 14 },
  lg: { fontSize: 16 },
};
