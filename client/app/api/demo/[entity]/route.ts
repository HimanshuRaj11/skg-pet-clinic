
import { NextResponse } from "next/server";
import * as data from "@/lib/demo-data";

export async function GET(
    request: Request,
    props: { params: Promise<{ entity: string }> }
) {
    const params = await props.params;
    const entity = params.entity;

    // @ts-ignore
    const result = data[entity as keyof typeof data];

    if (result) {
        return NextResponse.json(result);
    }

    return NextResponse.json({ error: "Entity not found" }, { status: 404 });
}
