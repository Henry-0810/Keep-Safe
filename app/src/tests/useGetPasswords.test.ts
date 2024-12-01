import { renderHook, act, waitFor } from '@testing-library/react';
import usePasswords from '../hooks/Password/useGetPasswords';
import { useAuth } from '../contexts/authContext';
import { getPasswords } from '../api/Password/passwordService';

jest.mock('../api/Password/passwordService');
jest.mock('../contexts/authContext');

describe('usePasswords', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch passwords successfully', async () => {
    const mockEmail = 'munli2002@gmail.com';
    const mockPasswords = {
      passwords: [
        { created_at: '23/11/2024 21:28:27', password_name: 'Amazon Web Services' },
        { created_at: '23/11/2024 21:28:31', password_name: 'Facebook' },
        { created_at: '24/11/2024 17:02:17', password_name: 'Instagram' },
        { created_at: '24/11/2024 18:13:21', password_name: 'Snapchat' },
      ],
    };

    (useAuth as jest.Mock).mockReturnValue({ email: mockEmail });
    (getPasswords as jest.Mock).mockResolvedValue(mockPasswords);

    const { result } = renderHook(() => usePasswords());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.passwords).toEqual(mockPasswords.passwords);
    expect(result.current.error).toBeNull();
    expect(getPasswords).toHaveBeenCalledWith(mockEmail);
  });

  it('should handle error when fetching passwords', async () => {
    const mockEmail = 'test@example.com';
    const mockError = new Error('Failed to fetch passwords');

    (useAuth as jest.Mock).mockReturnValue({ email: mockEmail });
    (getPasswords as jest.Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() => usePasswords());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.passwords).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch passwords');
  });

  it('should handle case when email is not available', async () => {
    (useAuth as jest.Mock).mockReturnValue({ email: null });

    const { result } = renderHook(() => usePasswords());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.passwords).toEqual([]);
    expect(result.current.error).toBe('No email found. Please log in.');
    expect(getPasswords).not.toHaveBeenCalled();
  });

  it('should refetch passwords when refetchPasswords is called', async () => {
    const mockEmail = 'munli2002@gmail.com';
    const mockPasswords = {
      passwords: [
        { created_at: '23/11/2024 21:28:27', password_name: 'Amazon Web Services' },
        { created_at: '23/11/2024 21:28:31', password_name: 'Facebook' },
        { created_at: '24/11/2024 17:02:17', password_name: 'Instagram' },
        { created_at: '24/11/2024 18:13:21', password_name: 'Snapchat' },
      ],
    };

    (useAuth as jest.Mock).mockReturnValue({ email: mockEmail });
    (getPasswords as jest.Mock).mockResolvedValue(mockPasswords);

    const { result } = renderHook(() => usePasswords());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.passwords).toEqual(mockPasswords.passwords);

    const newMockPasswords = [
      ...mockPasswords.passwords,
      { created_at: '2023-01-02', password_name: 'Test Password 2' },
    ];
    (getPasswords as jest.Mock).mockResolvedValue({ passwords: newMockPasswords });

    await act(async () => {
      await result.current.refetchPasswords();
    });

    await waitFor(() => expect(result.current.passwords).toEqual(newMockPasswords));
    expect(getPasswords).toHaveBeenCalledTimes(2);
  });
});
