import { UrlPare } from '@prisma/client';
import { atom } from 'jotai';

export const urlParesAtom = atom<UrlPare[]>([]);

export const userAtom = atom<
  | {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    }
  | undefined
>(undefined);
