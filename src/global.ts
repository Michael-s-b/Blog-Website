import mongoose, { model, Types } from "mongoose";

// mongoose models and schemas
// 1. Create an interface representing a document in MongoDB.
export interface Post {
	_id: Types.ObjectId;
	title: string;
	text: string;
}
// 2. Create a Schema corresponding to the document interface.

export const postSchema = new mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
});
// 3. Create a Model.
export const Post = model<Post>("Post", postSchema);
