import prisma from '@/utils/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function createUrl(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const JSONdata = JSON.parse(req.body);
  const result = await prisma.urlPare.delete({
    where: {
      id: JSONdata.id,
    },
  });
  res.json(result);
}
