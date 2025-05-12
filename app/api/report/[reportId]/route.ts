import { NextResponse } from 'next/server';
import dbConnect from '@lib/mongodb';
import ReportModel from '../../../../models/Report'; // Adjusted relative path
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route'; // Adjusted relative path

export async function GET(
    request: Request,
    { params }: { params: { reportId: string } }
) {
    const { reportId } = params;

    if (!reportId) {
        return NextResponse.json({ message: 'Report ID is required.' }, { status: 400 });
    }

    try {
        await dbConnect();
        const session = await getServerSession(authOptions);

        const report = await ReportModel.findById(reportId);

        if (!report) {
            return NextResponse.json({ message: 'Report not found.' }, { status: 404 });
        }

        // Optional: Check if the logged-in user owns this report or if reports are public
        // For now, we'll allow any authenticated user to fetch any report by ID if found.
        // If you want to restrict access:
        if (!session || !session.user || (session.user as { id?: string }).id !== report.user.toString()) {
             // If reports are private and user is not owner (and not admin, etc.)
            // return NextResponse.json({ message: 'Unauthorized to view this report.' }, { status: 403 });
        }
        // If making reports public, you might remove the session check or modify logic.
        // For now, we allow fetching if found, but the check above is a placeholder for stricter auth.


        return NextResponse.json(report, { status: 200 });

    } catch (error: any) {
        console.error('[API /api/report/[reportId]] Error fetching report:', error);
        if (error.kind === 'ObjectId') {
            return NextResponse.json({ message: 'Invalid Report ID format.' }, { status: 400 });
        }
        return NextResponse.json({ message: 'Server error fetching report.' }, { status: 500 });
    }
}