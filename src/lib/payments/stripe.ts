import { loadStripe } from '@stripe/stripe-js';
import type { Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

export interface CreateCheckoutSessionParams {
  priceId: string;
  userId?: string;
  successUrl?: string;
  cancelUrl?: string;
}

export interface CheckoutSession {
  id: string;
  url: string;
}

/**
 * Create a Stripe checkout session
 * This function should call your backend API endpoint
 */
export async function createCheckoutSession(
  params: CreateCheckoutSessionParams
): Promise<CheckoutSession> {
  const response = await fetch('/api/stripe/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error('Failed to create checkout session');
  }

  return response.json();
}

/**
 * Redirect to Stripe checkout
 * Note: Directly redirects to the checkout URL from the session
 */
export async function redirectToCheckout(params: CreateCheckoutSessionParams) {
  const session = await createCheckoutSession(params);

  // Redirect directly to the checkout URL
  window.location.href = session.url;
}

/**
 * Create a Stripe customer portal session
 * This function should call your backend API endpoint
 */
export async function createPortalSession(customerId: string): Promise<{ url: string }> {
  const response = await fetch('/api/stripe/create-portal-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ customerId }),
  });

  if (!response.ok) {
    throw new Error('Failed to create portal session');
  }

  return response.json();
}

/**
 * Redirect to Stripe customer portal
 */
export async function redirectToPortal(customerId: string) {
  const { url } = await createPortalSession(customerId);
  window.location.href = url;
}
