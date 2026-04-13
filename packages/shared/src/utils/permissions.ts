export type UserRole = 'buyer' | 'seller' | 'admin' | 'inspector';

export interface UserContext {
  id: string;
  role: UserRole;
}

export const ROLES = {
  BUYER: 'buyer' as UserRole,
  SELLER: 'seller' as UserRole,
  ADMIN: 'admin' as UserRole,
  INSPECTOR: 'inspector' as UserRole,
};

// -----------------------------------------------------------------------------
// Role Checkers
// -----------------------------------------------------------------------------

export function isAdmin(user?: UserContext | null): boolean {
  return user?.role === ROLES.ADMIN;
}

export function isSeller(user?: UserContext | null): boolean {
  return user?.role === ROLES.SELLER;
}

export function isBuyer(user?: UserContext | null): boolean {
  return user?.role === ROLES.BUYER;
}

export function isInspector(user?: UserContext | null): boolean {
  return user?.role === ROLES.INSPECTOR;
}

// -----------------------------------------------------------------------------
// Resource Permission Helpers (UI layer rules mapping to RLS backend logic)
// -----------------------------------------------------------------------------

export function canCreateListing(user?: UserContext | null): boolean {
  return isSeller(user);
}

export function canEditListing(
  user?: UserContext | null,
  listingSellerId?: string
): boolean {
  if (!user || !listingSellerId) return false;
  return isAdmin(user) || (isSeller(user) && user.id === listingSellerId);
}

export function canPlaceBid(user?: UserContext | null): boolean {
  return isBuyer(user);
}

export function canCreateTransaction(user?: UserContext | null): boolean {
  return isBuyer(user);
}

export function canUploadPaymentReceipt(
  user?: UserContext | null,
  transactionBuyerId?: string
): boolean {
  if (!user || !transactionBuyerId) return false;
  return isBuyer(user) && user.id === transactionBuyerId;
}

export function canVerifyPayment(user?: UserContext | null): boolean {
  return isAdmin(user);
}

export function canSubmitInspection(
  user?: UserContext | null,
  inspectorId?: string
): boolean {
  if (!user || !inspectorId) return false;
  return isInspector(user) && user.id === inspectorId;
}

export function canResolveDispute(user?: UserContext | null): boolean {
  return isAdmin(user);
}

export function canAccessAdminPanel(user?: UserContext | null): boolean {
  return isAdmin(user);
}
