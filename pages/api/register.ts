import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      firstName,
      lastName,
      email,
      grade,
      events,
      physicsCourses,
      physicsOther,
      mathCourses,
      mathOther,
      meetingPreference,
      meetingOther,
    } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !grade) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!events || events.length === 0) {
      return res.status(400).json({ error: 'Please select at least one event' });
    }

    if (!email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Create registration
    const registration = await prisma.registration.create({
      data: {
        firstName,
        lastName,
        email,
        grade,
        events: events || [],
        physicsCourses: physicsCourses || [],
        physicsOther: physicsOther || null,
        mathCourses: mathCourses || [],
        mathOther: mathOther || null,
        meetingPreference: meetingPreference || [],
        meetingOther: meetingOther || null,
      },
    });

    return res.status(201).json({ success: true, id: registration.id });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Failed to save registration' });
  }
}
