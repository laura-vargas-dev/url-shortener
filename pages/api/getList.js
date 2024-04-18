import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const { email } = req.body;
    const data = await prisma.link.findMany({
      where: {
        email: email,
        NOT: [
          {
            email: null,
          },
        ],
      },
      select: {
        url: true,
        shortUrl: true,
        clicks: true,
      },
    });
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send({ error: "Oops!, something went wrong..." });
  }
};
