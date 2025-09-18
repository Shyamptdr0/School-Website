import schoolData from "../../../data/school-info.json";

export async function POST(req) {
    const body = await req.json();
    const { message } = body;

    const query = message.toLowerCase();
    let reply = "Sorry, I could not find information about that.";
    let suggestions = ["Admission Process", "Fees Structure", "Facilities", "Contact"]; // default

    if (query.includes("admission")) {
        reply = schoolData.admission;
        suggestions = ["Fees Structure", "Facilities", "Contact"];
    } else if (query.includes("fee") || query.includes("fees")) {
        reply = schoolData.fees;
        suggestions = ["Admission Process", "Timings", "Contact"];
    } else if (query.includes("time") || query.includes("timing")) {
        reply = schoolData.timings;
        suggestions = ["Admission Process", "Fees Structure", "Facilities"];
    } else if (query.includes("contact")) {
        reply = `Phone: ${schoolData.contact}, Email: ${schoolData.email}`;
        suggestions = ["Address", "Facilities", "Admission Process"];
    } else if (query.includes("facility") || query.includes("facilities")) {
        reply = schoolData.facilities;
        suggestions = ["Fees Structure", "Timings", "Contact"];
    } else if (query.includes("address") || query.includes("location")) {
        reply = schoolData.address;
        suggestions = ["Contact", "Admission Process", "Facilities"];
    } else if (query.includes("name")) {
        reply = schoolData.name;
        suggestions = ["Address", "Timings", "Facilities"];
    }

    return new Response(JSON.stringify({ reply, suggestions }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
