import { describe, it, expect, vi } from 'vitest';

// Mock the Supabase client before importing
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    auth: {},
    from: vi.fn(),
  })),
}));

describe('supabase', () => {
  it('should create a Supabase client', async () => {
    const { supabase } = await import('./supabase');
    expect(supabase).toBeDefined();
  });

  it('should have auth methods', async () => {
    const { supabase } = await import('./supabase');
    expect(supabase.auth).toBeDefined();
  });

  it('should have database query methods', async () => {
    const { supabase } = await import('./supabase');
    expect(supabase.from).toBeDefined();
  });
});
