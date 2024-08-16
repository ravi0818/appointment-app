import { RootState } from '@/redux/store';

import { useAppSelector } from '.';

export function useRole() {
  const role = useAppSelector((state: RootState) => state.auth.user?.role) ?? '';
  return role;
}
