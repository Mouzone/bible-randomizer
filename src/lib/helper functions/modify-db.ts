import { db } from "$lib/db";

export async function markRead(id: number, date: string) {
	if (!date) {
		date = "";
	}
	await db.readingProgress.update(id, { dateRead: date });
}

export async function clearRead(id: number) {
	await db.readingProgress.update(id, { dateRead: "" });
}

export async function reset() {
	await db.readingProgress.toCollection().modify({ dateRead: "" });
}
