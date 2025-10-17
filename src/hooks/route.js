export async function POST(req) {
    const body = await req.json();
    const paymentId = body.data?.id;
    if (!paymentId) {
        return new Response("No payment ID", { status: 400 });
    }

    const result = await mercadoPago.payment.findById(paymentId);
}