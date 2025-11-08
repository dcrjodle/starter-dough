import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getStripe,
  createCheckoutSession,
  redirectToCheckout,
  createPortalSession,
  redirectToPortal,
} from './stripe';

// Mock Stripe
vi.mock('@stripe/stripe-js', () => ({
  loadStripe: vi.fn(() => Promise.resolve({ id: 'mock-stripe' })),
}));

describe('stripe', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
    delete (window as { location?: unknown }).location;
    window.location = { href: '' } as Location;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getStripe', () => {
    it('should return a Stripe instance', async () => {
      const stripe = await getStripe();
      expect(stripe).toBeDefined();
    });

    it('should reuse the same Stripe instance', async () => {
      const stripe1 = await getStripe();
      const stripe2 = await getStripe();
      expect(stripe1).toBe(stripe2);
    });
  });

  describe('createCheckoutSession', () => {
    it('should create a checkout session', async () => {
      const mockSession = { id: 'session_123', url: 'https://checkout.stripe.com' };
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
        ok: true,
        json: async () => mockSession,
      });

      const result = await createCheckoutSession({
        priceId: 'price_123',
        userId: 'user_123',
      });

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/stripe/create-checkout-session',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            priceId: 'price_123',
            userId: 'user_123',
          }),
        })
      );
      expect(result).toEqual(mockSession);
    });

    it('should throw error on failed request', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
        ok: false,
      });

      await expect(
        createCheckoutSession({ priceId: 'price_123' })
      ).rejects.toThrow('Failed to create checkout session');
    });
  });

  describe('redirectToCheckout', () => {
    it('should redirect to checkout URL', async () => {
      const mockSession = { id: 'session_123', url: 'https://checkout.stripe.com' };
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
        ok: true,
        json: async () => mockSession,
      });

      await redirectToCheckout({ priceId: 'price_123' });

      expect(window.location.href).toBe('https://checkout.stripe.com');
    });
  });

  describe('createPortalSession', () => {
    it('should create a portal session', async () => {
      const mockPortal = { url: 'https://billing.stripe.com' };
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
        ok: true,
        json: async () => mockPortal,
      });

      const result = await createPortalSession('cus_123');

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/stripe/create-portal-session',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ customerId: 'cus_123' }),
        })
      );
      expect(result).toEqual(mockPortal);
    });

    it('should throw error on failed request', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
        ok: false,
      });

      await expect(createPortalSession('cus_123')).rejects.toThrow(
        'Failed to create portal session'
      );
    });
  });

  describe('redirectToPortal', () => {
    it('should redirect to portal URL', async () => {
      const mockPortal = { url: 'https://billing.stripe.com' };
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
        ok: true,
        json: async () => mockPortal,
      });

      await redirectToPortal('cus_123');

      expect(window.location.href).toBe('https://billing.stripe.com');
    });
  });
});
