import Dexie, { type EntityTable } from "dexie";
import data from "$lib/bible-data.json";

interface ReadingProgress {
	id: number;
	name: string;
	testament: string;
	dateRead: string;
	chapters: number;
}

const db = new Dexie("BibleDb") as Dexie & {
	readingProgress: EntityTable<ReadingProgress, "id">;
};

db.version(2).stores({
	readingProgress: "++id, name, testament, dateRead",
});

db.version(3)
	.stores({
		readingProgress: "++id, name, testament, dateRead, chapters",
	})
	.upgrade(async (tx) => {
		tx.table("readingProgress").clear();

		const readingProgressData = data.map((book) => {
			return {
				name: book.name,
				testament: book.testament,
				dateRead: "",
				chapters: book.chapters,
			};
		});
		await tx.table("readingProgress").bulkAdd(readingProgressData);

		console.log(
			"Re-populated readingProgress table with initial data after schema upgrade."
		);
	});

db.version(4)
	.stores({
		readingProgress: "++id, name, testament, dateRead, chapters",
	})
	.upgrade(async (tx) => {
		tx.table("readingProgress").clear();

		const readingProgressData = data.map((book) => {
			return {
				name: book.name,
				testament: book.testament,
				dateRead: "",
				chapters: book.chapters,
			};
		});
		await tx.table("readingProgress").bulkAdd(readingProgressData);

		console.log(
			"Re-populated readingProgress table with initial data after schema upgrade."
		);
	});
export type { ReadingProgress };
export { db };
