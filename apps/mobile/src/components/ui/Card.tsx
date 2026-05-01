import { forwardRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { ViewProps, ViewStyle } from 'react-native';

// ---------------------------------------------------------------------------
// Card — Compound card component for React Native
// ---------------------------------------------------------------------------

export interface CardProps extends ViewProps {
  /** Removes default padding */
  noPadding?: boolean;
}

export const Card = forwardRef<View, CardProps>(
  ({ noPadding = false, style, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        style={[styles.card, noPadding ? null : styles.padding, style]}
        {...props}
      >
        {children}
      </View>
    );
  }
);

Card.displayName = 'Card';

// ---------------------------------------------------------------------------
// Card Subcomponents
// ---------------------------------------------------------------------------

export const CardHeader = forwardRef<View, ViewProps>(
  ({ style, children, ...props }, ref) => (
    <View ref={ref} style={[styles.header, style]} {...props}>
      {children}
    </View>
  )
);

CardHeader.displayName = 'CardHeader';

export interface CardTitleProps extends ViewProps {
  children: string;
}

export const CardTitle = forwardRef<View, CardTitleProps>(
  ({ children, ...props }, ref) => (
    <View ref={ref} {...props}>
      <Text style={styles.title}>{children}</Text>
    </View>
  )
);

CardTitle.displayName = 'CardTitle';

export const CardContent = forwardRef<View, ViewProps>(
  ({ style, children, ...props }, ref) => (
    <View ref={ref} style={[styles.content, style]} {...props}>
      {children}
    </View>
  )
);

CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<View, ViewProps>(
  ({ style, children, ...props }, ref) => (
    <View ref={ref} style={[styles.footer, style]} {...props}>
      {children}
    </View>
  )
);

CardFooter.displayName = 'CardFooter';

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  padding: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  content: {
    // Default content container
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
});
