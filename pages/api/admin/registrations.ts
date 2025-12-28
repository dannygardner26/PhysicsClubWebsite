import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body;

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  try {
    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({ registrations });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return res.status(500).json({ error: 'Failed to fetch registrations' });
  }
}
