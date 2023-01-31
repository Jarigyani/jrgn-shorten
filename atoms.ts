import { UrlPare } from '@prisma/client';
import { atom } from 'jotai';

export const urlParesAtom = atom<UrlPare[]>([]);
