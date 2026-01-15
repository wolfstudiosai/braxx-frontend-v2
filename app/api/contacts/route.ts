export async function POST(request: Request) {
    try {
        const body = await request.json();
        const apiUrl = process.env.API_URL;

        const res = await fetch(`${apiUrl}/contacts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-tenant-slug": "braxxusa",
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();
        return Response.json(data);
    } catch (error: any) {
        console.log(error)
        return Response.json({
            success: false,
            message: error?.message || "Something went wrong",
        });
    }
}