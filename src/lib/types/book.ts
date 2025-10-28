interface Book {
	name: string;
	testament: "old" | "new";
	chapters: number;
	dateRead: string;
}

type Books = Book[];
