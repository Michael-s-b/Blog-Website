"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.truncateString = exports.postTitleToURL = void 0;
//converts the post title to a url friendly string. eg. "My First Post" becomes "my-first-post"
function postTitleToURL(title) {
    title = title.replaceAll(" ", "-");
    title = title.toLowerCase();
    return title;
}
exports.postTitleToURL = postTitleToURL;
//truncates a string{str} to the specified length{num} and appends "..." to the end.
function truncateString(str, num) {
    if (str.length > num) {
        return str.slice(0, num) + " ...";
    }
    else {
        return str;
    }
}
exports.truncateString = truncateString;
