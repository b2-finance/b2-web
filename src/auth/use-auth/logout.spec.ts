import { describe, expect, it, vi } from 'vitest';
import { logout } from './logout';

describe(logout.name, () => {
  it('should return true when logout is successful', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      text: async () => true,
    });

    const success = await logout();
    expect(success).toEqual(true);
  });

  it('should return false when logout is unsuccessful', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      text: async () => false,
    });

    const success = await logout();
    expect(success).toEqual(false);
  });
});
