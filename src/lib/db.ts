import Dexie, { type EntityTable } from "dexie";

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
	db.readingProgress.bulkAdd([]);
});

export type { ReadingProgress };
export { db };
