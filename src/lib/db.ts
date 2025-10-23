import Dexie, { type EntityTable } from "dexie";
import data from "$lib/bible-data.json";

interface ReadingProgress {
	id: number;
	name: string;
	testament: string;
	dateRead: string;
}

const db = new Dexie("BibleDb") as Dexie & {
	readingProgress: EntityTable<ReadingProgress, "id">;
};
db.version(1).stores({
	readingProgress: "++id, name, testament, dateRead",
});

db.on("populate", function () {
	const readingProgressData = data.map((book) => {
		return { name: book.name, testament: book.testament, dateRead: "" };
	});
	db.readingProgress.bulkAdd(readingProgressData);
});

export type { ReadingProgress };
export { db };
