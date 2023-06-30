import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { hotelOwnerValidationSchema } from 'validationSchema/hotel-owners';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getHotelOwners();
    case 'POST':
      return createHotelOwner();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getHotelOwners() {
    const data = await prisma.hotel_owner
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'hotel_owner'));
    return res.status(200).json(data);
  }

  async function createHotelOwner() {
    await hotelOwnerValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.hotel?.length > 0) {
      const create_hotel = body.hotel;
      body.hotel = {
        create: create_hotel,
      };
    } else {
      delete body.hotel;
    }
    const data = await prisma.hotel_owner.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
