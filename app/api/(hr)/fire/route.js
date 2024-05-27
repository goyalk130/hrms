// pages/api/hr/employees/[id].js

import connectDB from '@/database/db';
import User from '@/models/User';
import Team from '@/models/Team';
import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';
import authOptions from '../../auth/[...nextauth]/option';

export const DELETE = async (req, res) => {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'HR') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await connectDB();
    const { id } = req.query;

    try {
        const user = await User.findByIdAndDelete(id);
        if (user.team) {
            const team = await Team.findById(user.team);
            if (team) {
                team.members = team.members.filter(member => member.toString() !== id);
                await team.save();
            }
        }

        return NextResponse.json({ message: 'Employee fired successfully' });
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
};
