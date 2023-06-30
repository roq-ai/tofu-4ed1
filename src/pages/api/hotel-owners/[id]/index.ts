import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { hotelOwnerValidationSchema } from 'validationSchema/hotel-owners';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.hotel_owner
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getHotelOwnerById();
    case 'PUT':
      return updateHotelOwnerById();
    case 'DELETE':
      return deleteHotelOwnerById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getHotelOwnerById() {
    const data = await prisma.hotel_owner.findFirst(convertQueryToPrismaUtil(req.query, 'hotel_owner'));
    return res.status(200).json(data);
  }

  async function updateHotelOwnerById() {
    await hotelOwnerValidationSchema.validate(req.body);
    const data = await prisma.hotel_owner.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteHotelOwnerById() {
    const data = await prisma.hotel_owner.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
