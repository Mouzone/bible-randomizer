import Dexie, { type EntityTable } from "dexie";
import data from "$lib/bible-data.json";

interface ReadingProgress {
	id: number;
	book: string;
	dateRead: string;
}

const db = new Dexie("BibleDb") as Dexie & {
	readingProgress: EntityTable<ReadingProgress, "id">;
};
db.version(1).stores({
	readingProgress: "++id, book, dateRead",
});

db.on("populate", function () {
	const readingProgressData = data.map((book) => {
		return { book: book.bookName, dateRead: "" };
	});
	db.readingProgress.bulkAdd(readingProgressData);
});

export type { ReadingProgress };
export { db };
