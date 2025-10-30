import { Note } from "../models/Note";
import { Op } from "sequelize";

export const createNote = async (userId: number, data: any) => {
  const note = await Note.create({ ...data, userId });
  return note.toJSON();
};

export const listNotes = async (userId: number, filters: any = {}) => {
  const query: any = { userId };

  if (filters.title) query.title = { [Op.iLike]: `%${filters.title}%` };
  if (filters.tag) query.tags = { [Op.contains]: [filters.tag] };
  if (filters.pinned !== undefined) query.pinned = filters.pinned === "true" || filters.pinned === true;

  const notes = await Note.findAll({ where: query, order: [["updatedAt", "DESC"]] });
  return notes.map(n => n.toJSON());
};

export const getNoteById = async (id: number) => {
  return Note.findByPk(id).then(n => n?.toJSON() || null);
};

export const replaceNote = async (id: number, data: any) => {
  const note = await Note.findByPk(id);
  if (!note) return null;
  await note.update(data);
  return note.toJSON();
};

export const patchNote = async (id: number, data: any) => {
  return replaceNote(id, data);
};

export const deleteNoteById = async (id: number) => {
  const note = await Note.findByPk(id);
  if (!note) return;
  await note.destroy();
};
