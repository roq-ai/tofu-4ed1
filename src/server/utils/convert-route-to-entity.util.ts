const mapping: Record<string, string> = {
  bookings: 'booking',
  guests: 'guest',
  hotels: 'hotel',
  'hotel-owners': 'hotel_owner',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
