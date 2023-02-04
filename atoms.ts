import { UrlPare } from '@prisma/client';
import { atom } from 'jotai';
import { SessionUser } from './types/types';

export const urlParesAtom = atom<UrlPare[]>([]);

export const sortedUrlParesAtom = atom<UrlPare[]>((get) => {
  const urlPares = get(urlParesAtom);
  return urlPares.sort((a, b) => {
    return a.createdAt > b.createdAt ? -1 : 1;
  });
});

export const userAtom = atom<SessionUser>(undefined);

export const urlAtom = atom<UrlPare | null>(null);
