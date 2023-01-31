import prisma from '@/utils/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function geturl(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const JSONdata = JSON.parse(req.body);
  const result = await prisma.urlPare.findFirst({
    where: {
      id: JSONdata.id,
    },
  });
  res.json(result);
}
