import { MongoClient, ObjectId } from "mongodb";

const mongoUri =
  process.env.MONGODB_URI ||
  "mongodb+srv://admin:admin@cluster0.34lhwaj.mongodb.net/?appName=Cluster0";
const mongoDbName = process.env.MONGODB_DB || "instalyd";
const contactRequestsCollection = "contact_requests";

let clientPromise;
let indexesPromise;

function formatMongoError(error) {
  return error instanceof Error ? error.message : "Kunne ikke kontakte MongoDB.";
}

export function isMongoConfigured() {
  return Boolean(mongoUri);
}

function getMongoClient() {
  if (!mongoUri) {
    throw new Error("MongoDB er ikke konfigurert.");
  }

  if (!clientPromise) {
    clientPromise = new MongoClient(mongoUri).connect();
  }

  return clientPromise;
}

async function getCollection() {
  const client = await getMongoClient();
  const collection = client.db(mongoDbName).collection(contactRequestsCollection);

  if (!indexesPromise) {
    indexesPromise = Promise.all([
      collection.createIndex({ created_at: -1 }),
      collection.createIndex({ scheduled_for: 1 }),
      collection.createIndex({ archived_at: -1 }),
    ]).catch(() => null);
  }

  await indexesPromise;

  return collection;
}

function toIsoString(value) {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value.toISOString();
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function toNullableDate(value) {
  if (!value) {
    return null;
  }

  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function normalizeRequestDocument(document) {
  if (!document) {
    return null;
  }

  return {
    id: document._id?.toString?.() || document.id?.toString?.() || "",
    name: document.name || "",
    car: document.car || "",
    email: document.email || "",
    phone: document.phone || "",
    service: document.service || "",
    details: document.details || "",
    status: document.status || "new",
    source: document.source || "website",
    created_at: toIsoString(document.created_at),
    scheduled_for: toIsoString(document.scheduled_for),
    booking_notes: document.booking_notes || null,
    archived_at: toIsoString(document.archived_at),
    receipt_reference: document.receipt_reference || null,
    receipt_issued_at: toIsoString(document.receipt_issued_at),
    receipt_location: document.receipt_location || null,
    receipt_price: document.receipt_price || null,
    receipt_payment_method: document.receipt_payment_method || null,
    receipt_work_summary: document.receipt_work_summary || null,
    receipt_notes: document.receipt_notes || null,
  };
}

function getObjectId(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return new ObjectId(id);
}

function normalizeCreatePayload(payload) {
  return {
    name: payload.name?.toString().trim() || "",
    car: payload.car?.toString().trim() || "",
    email: payload.email?.toString().trim() || "",
    phone: payload.phone?.toString().trim() || "",
    service: payload.service?.toString().trim() || "",
    details: payload.details?.toString().trim() || "",
    source: payload.source || "website",
    status: payload.status || "new",
    created_at: new Date(),
    scheduled_for: null,
    booking_notes: null,
    archived_at: null,
    receipt_reference: null,
    receipt_issued_at: null,
    receipt_location: null,
    receipt_price: null,
    receipt_payment_method: null,
    receipt_work_summary: null,
    receipt_notes: null,
  };
}

function normalizeUpdatePayload(payload) {
  const update = {};
  const dateFields = new Set(["scheduled_for", "archived_at", "receipt_issued_at"]);

  for (const [key, value] of Object.entries(payload)) {
    if (dateFields.has(key)) {
      update[key] = toNullableDate(value);
    } else {
      update[key] = value === "" ? null : value;
    }
  }

  return update;
}

export async function listContactRequests(limit = 50) {
  if (!isMongoConfigured()) {
    return {
      data: [],
      error: "MongoDB er ikke konfigurert.",
      supportsScheduling: true,
      supportsOfficeManagement: true,
    };
  }

  try {
    const collection = await getCollection();
    const documents = await collection
      .find({})
      .sort({ created_at: -1 })
      .limit(limit)
      .toArray();

    return {
      data: documents.map(normalizeRequestDocument),
      error: null,
      supportsScheduling: true,
      supportsOfficeManagement: true,
    };
  } catch (error) {
    return {
      data: [],
      error: formatMongoError(error),
      supportsScheduling: true,
      supportsOfficeManagement: true,
    };
  }
}

export async function getContactRequestById(id) {
  if (!isMongoConfigured()) {
    return {
      data: null,
      error: "MongoDB er ikke konfigurert.",
      supportsOfficeManagement: true,
    };
  }

  const objectId = getObjectId(id);

  if (!objectId) {
    return {
      data: null,
      error: "Ugyldig saks-ID.",
      supportsOfficeManagement: true,
    };
  }

  try {
    const collection = await getCollection();
    const document = await collection.findOne({ _id: objectId });

    return {
      data: normalizeRequestDocument(document),
      error: null,
      supportsOfficeManagement: true,
    };
  } catch (error) {
    return {
      data: null,
      error: formatMongoError(error),
      supportsOfficeManagement: true,
    };
  }
}

export async function createContactRequest(payload) {
  if (!isMongoConfigured()) {
    return {
      data: null,
      error: "MongoDB er ikke konfigurert.",
    };
  }

  try {
    const collection = await getCollection();
    const document = normalizeCreatePayload(payload);
    const result = await collection.insertOne(document);

    return {
      data: normalizeRequestDocument({ ...document, _id: result.insertedId }),
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: formatMongoError(error),
    };
  }
}

export async function updateContactRequest(id, payload) {
  if (!isMongoConfigured()) {
    return {
      data: null,
      error: "MongoDB er ikke konfigurert.",
    };
  }

  const objectId = getObjectId(id);

  if (!objectId) {
    return {
      data: null,
      error: "Ugyldig saks-ID.",
    };
  }

  try {
    const collection = await getCollection();
    const update = normalizeUpdatePayload(payload);
    const result = await collection.findOneAndUpdate(
      { _id: objectId },
      { $set: update },
      { returnDocument: "after" },
    );

    if (!result) {
      return {
        data: null,
        error: "Fant ikke saken.",
      };
    }

    return {
      data: normalizeRequestDocument(result),
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: formatMongoError(error),
    };
  }
}

export async function deleteExpiredArchivedContactRequests() {
  if (!isMongoConfigured()) {
    return;
  }

  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() - 5);

  try {
    const collection = await getCollection();
    await collection.deleteMany({
      archived_at: {
        $lt: expiryDate,
      },
    });
  } catch {
    // Ignore cleanup failures so the admin page still loads.
  }
}
