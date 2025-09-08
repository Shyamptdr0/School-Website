import OpenAI from "openai";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();

    const { message } = req.body;
    const text = message.toLowerCase();

    // Default rule-based reply
    let reply =
        "🙏 Hello! Please ask about 'admission', 'fees', or 'contact' for Krishna Academy.";

    if (text.includes("admission")) {
        reply =
            "📚 Admission Info: Admissions are open! Visit our office Mon–Fri, 9 AM–3 PM or check our website under Admissions.";
    } else if (text.includes("fees")) {
        reply =
            "💰 Fee Details: The fee structure is available on our website or at the school office.";
    } else if (text.includes("contact")) {
        reply =
            "📞 Contact Info: Call us at +91-9876543210 or visit Krishna Academy, Dhargoan.";
    }

    try {
        if (process.env.OPENAI_API_KEY) {
            const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content:
                            "You are a helpful assistant for Krishna Academy School. Answer only school-related queries (admission, fees, contact, events, facilities).",
                    },
                    { role: "user", content: message },
                ],
            });
            reply = response.choices[0].message.content;
        }
    } catch (error) {
        console.error("OpenAI error:", error.message);
    }

    res.json({ reply });
}
