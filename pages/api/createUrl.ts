import prisma from '@/utils/prisma';
import { nanoid } from 'nanoid';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function createUrl(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const randomStr = nanoid(5);
  const JSONdata = JSON.parse(req.body);
  const result = await prisma.urlPare.create({
    data: {
      id: randomStr,
      url: JSONdata.url as string,
			user: JSONdata.session.user
    },
  });
  res.json(result);
}
