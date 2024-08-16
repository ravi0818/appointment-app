import { RootState } from '@/redux/store';

import { useAppSelector } from '.';

export function useAuth() {
  const { token } = useAppSelector((state: RootState) => state.auth);
  return !!token;
}
