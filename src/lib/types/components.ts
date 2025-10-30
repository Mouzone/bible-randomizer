type Components = "BookGenerator" | "ChapterGenerator" | "ReadingTracker";
type LayoutEntry = {
	left: Components;
	right: Components;
};
type LayoutData = Record<Components, LayoutEntry>;
