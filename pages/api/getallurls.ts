import prisma from '@/utils/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getallurls(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const JSONdata = JSON.parse(req.body);
  if (!JSONdata.email)
    return res.status(400).json({ error: 'No email provided.' });
  const id = await prisma.user.findFirst({
    where: {
      email: JSONdata.email,
    },
  });
  const result = await prisma.urlPare.findMany({
    where: {
      userId: id?.id,
    },
  });
  res.json(result);
}
