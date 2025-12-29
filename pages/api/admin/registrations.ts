import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!passwordHash) {
    console.error('ADMIN_PASSWORD_HASH not configured');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const isValid = await bcrypt.compare(password, passwordHash);
  if (!isValid) {
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
