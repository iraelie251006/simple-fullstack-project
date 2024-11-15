// /api/courses/route.ts

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST (
    req: Request
) {
    try {
        const { title } = await req.json()
        const course = await db.courses.create({
            data: {
                title
            }
        })

        return NextResponse.json(course)

    } catch (error) {
        console.log("COURSE_ERROR", error)
        return new Response("An error occurred", { status: 500 })
    }
}