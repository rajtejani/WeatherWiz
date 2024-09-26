import { renderHook } from '@testing-library/react-hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSafeContainerStyles } from '../../src/hooks/useSafeContainerStyles';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(),
}));

describe('useSafeContainerStyles', () => {
  it('returns correct padding based on insets', () => {
    (useSafeAreaInsets as jest.Mock).mockReturnValue({ right: 10, left: 20 });

    const { result } = renderHook(() => useSafeContainerStyles());

    expect(result.current).toEqual({
      paddingRight: 10,
      paddingLeft: 20,
    });
  });
});