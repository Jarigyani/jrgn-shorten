import prisma from '@/utils/prisma';
import { nanoid } from 'nanoid';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function createUrl(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let randomStr = nanoid(5);
  for (let loop = true; loop; ) {
    if (
      await prisma.urlPare.findFirst({
        where: {
          id: randomStr,
        },
      })
    ) {
      randomStr = nanoid(5);
    } else {
      loop = false;
    }
  }
  const JSONdata = JSON.parse(req.body);
  let url: string = JSONdata.url;
  url = url.replace('http://', '');
  url = url.replace('https://', '');

  const user = await prisma.user.findFirst({
    where: {
      email: JSONdata.user.email,
    },
  });
  const result = await prisma.urlPare.create({
    data: {
      id: randomStr,
      url: url,
      userId: user?.id,
    },
  });
  res.json(result);
}
