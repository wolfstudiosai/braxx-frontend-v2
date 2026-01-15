export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;
        const apiUrl = process.env.API_URL;

        const res = await fetch(`${apiUrl}/newsletters`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-tenant-slug": "braxxusa",
            },
            body: JSON.stringify({ email }),
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