import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  const { shortId } = req.body;
  try {
    const [data] = await prisma.$transaction([
      prisma.link.findUnique({
        where: {
          shortUrl: shortId,
        },
        select: {
          url: true,
          shortUrl: true,
          clicks: true,
        },
      }),
      prisma.link.update({
        where: {
          shortUrl: shortId,
        },
        data: {
          clicks: { increment: 1 },
        },
      }),
    ]);
    return res.status(200).send(data);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Oops!, something went wrong..." });
  }
};
