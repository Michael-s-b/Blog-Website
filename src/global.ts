//converts the post title to a url friendly string. eg. "My First Post" becomes "my-first-post"
export function postTitleToURL(title: string): string {
	title = title.replaceAll(" ", "-");
	title = title.toLowerCase();
	return title;
}
//truncates a string{str} to the specified length{num} and appends "..." to the end.
export function truncateString(str: string, num: number): string {
	if (str.length > num) {
		return str.slice(0, num) + " ...";
	} else {
		return str;
	}
}
