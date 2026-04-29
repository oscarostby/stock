import { NextResponse } from "next/server";
import { createContactRequest } from "../../lib/contact-requests";

function getMissingField(payload) {
  const requiredFields = ["name", "car", "email", "phone", "service", "details"];

  return requiredFields.find((field) => !payload[field]?.toString().trim());
}

export async function POST(request) {
  const payload = await request.json();
  const missingField = getMissingField(payload);

  if (missingField) {
    return NextResponse.json(
      {
        error: `Mangler felt: ${missingField}`,
      },
      { status: 400 },
    );
  }

  const result = await createContactRequest(payload);

  if (result.error) {
    return NextResponse.json(
      {
        error: result.error,
      },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      data: result.data,
    },
    { status: 201 },
  );
}
