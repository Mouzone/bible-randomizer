import { openDB } from "idb";
import initialBookData from "$lib/bible-data.json";

const DB_NAME = "BibleStudyPWA";
const DB_VERSION = 1;

export async function initDB() {
	const db = await openDB(DB_NAME, DB_VERSION, {
		upgrade(db, oldVersion, newVersion, transaction) {
			const booksStore = db.createObjectStore("Books", {
				keyPath: "bookName",
			});

			initialBookData.forEach((book) => {
				booksStore.add({ ...book, selected: false });
			});

			db.createObjectStore("Settings", { keyPath: "key" });

			console.log(
				`IndexedDB created and seeded with Bible data at version ${newVersion}`
			);
		},
	});

	return db;
}
