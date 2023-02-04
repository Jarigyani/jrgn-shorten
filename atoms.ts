import { UrlPare } from '@prisma/client';
import { atom } from 'jotai';
import { SessionUser } from './types/types';

export const urlParesAtom = atom<UrlPare[]>([]);

export const userAtom = atom<SessionUser>(undefined);

export const urlAtom = atom<UrlPare | null>(null);
