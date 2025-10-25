import { db } from "$lib/db/db";

export async function markRead(id: number, date: string) {
	if (!date) {
		date = "";
	}
	await db.readingProgress.update(id, { dateRead: date });
}

export async function reset() {
	await db.readingProgress.toCollection().modify({ dateRead: "" });
}
