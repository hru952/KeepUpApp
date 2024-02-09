// import { expect, jest, test } from '@jest/globals';

const req = require('supertest');
const express = require('express');
const { noteRouter } = require('../routes/noteRoutes');
const { NoteModel } = require('../models/NoteModel');

const app = express();
app.use(express.json());
app.use('/', noteRouter);

describe('Get note', () => {
    test('should fetch notes and return status 1', async () => {
      const notes = [
        { _id: 'id1', title: 'title1', content: 'content1' },
        { _id: 'id2', title: 'title2', content: 'content2' },
      ];
  
      // Mock NoteModel.find to return the notes
      NoteModel.find = jest.fn().mockResolvedValue(notes);
  
      const res = await req(app).get('/');
  
      expect(NoteModel.find).toHaveBeenCalled();
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        data: notes,
        message: 'Success',
        status: 1,
      });
    });
  
    test('should return error message and status 0 if fetching notes fails', async () => {
      const errorMessage = 'An error occurred';
  
      // Mock NoteModel.find to throw an error
      NoteModel.find = jest.fn().mockRejectedValue(new Error(errorMessage));
  
      const res = await req(app).get('/');
  
      expect(NoteModel.find).toHaveBeenCalled();
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        message: errorMessage,
        status: 0,
      });
    });
  });


  describe('Create note', () => {
    test('should create a note and return status 1', async () => {
      const newNote = { title: 'new-title', content: 'new-content' };
  
      // Mock note.save() to simulate successful save
      NoteModel.prototype.save = jest.fn().mockResolvedValue();
  
      const res = await req(app)
        .post('/create')
        .send(newNote);
  
      expect(NoteModel.prototype.save).toHaveBeenCalled();
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        message: 'Note created',
        status: 1,
      });
    });
  
    test('should return error message and status 0 if note creation fails', async () => {
      const newNote = { title: 'new-title', content: 'new-content' };
      const errorMessage = 'An error occurred';
  
      // Mock note.save() to simulate failed save
      NoteModel.prototype.save = jest.fn().mockRejectedValue(new Error(errorMessage));
  
      const res = await req(app)
        .post('/create')
        .send(newNote);
  
      expect(NoteModel.prototype.save).toHaveBeenCalled();
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        message: errorMessage,
        status: 0,
      });
    });
  });
  


describe('Update note', () => {
    test('should update note and return status 1', async () => {
      const note = { _id: 'some-id', title: 'old-title', content: 'old-content' };
      const updatedNote = { title: 'new-title', content: 'new-content' };
  
      // Mock findByIdAndUpdate to return the updated note
      NoteModel.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedNote);
  
      const res = await req(app)
        .patch('/')
        .set('id', note._id)
        .send(updatedNote);
  
      // Error appears in here
      expect(NoteModel.findByIdAndUpdate).toHaveBeenCalledWith({ _id: note._id }, updatedNote);
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: 'Note updated', status: 1 });
    });
  
    test('should return error message and status 0 if update fails', async () => {
      const note = { _id: 'some-id', title: 'old-title', content: 'old-content' };
      const updatedNote = { title: 'new-title', content: 'new-content' };
      const errorMessage = 'An error occurred';
  
    // Mock findByIdAndUpdate to throw an error
    NoteModel.findByIdAndUpdate = jest.fn().mockRejectedValueOnce(new Error(errorMessage));
  
      const res = await req(app)
        .patch('/')
        .set('id', note._id)
        .send(updatedNote);
  
      expect(NoteModel.findByIdAndUpdate).toHaveBeenCalledWith({ _id: note._id }, updatedNote);
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: errorMessage, status: 0 });
    });
  });
  