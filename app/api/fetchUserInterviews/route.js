import { NextResponse } from 'next/server';
import { db } from '../../../utils/db';
import { eq, distinct } from 'drizzle-orm';
import { UserAnswer } from '../../../utils/schema';

export async function POST(request) {
    try {
        const { userEmail } = await request.json();

        if (!userEmail) {
            throw new Error('Missing userEmail in request');
        }

        // Fetch distinct mock interview IDs where the user has answered questions
        const userInterviews = await db
            .select({
                mockId: distinct(UserAnswer.mockIdRef)
            })
            .from(UserAnswer)
            .where(eq(UserAnswer.userEmail, userEmail));

        if (!userInterviews) {
            throw new Error('Database query failed');
        }

        const interviewCount = userInterviews.length;

        return NextResponse.json({ 
            interviewCount, 
            userInterviews 
        }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ 
            message: 'Internal server error', 
            error: err.message 
        }, { status: 500 });
    }
}
