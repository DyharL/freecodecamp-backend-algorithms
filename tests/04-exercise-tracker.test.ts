import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { ExerciseTrackerService } from '../src/microservices/04-exercise-tracker.js';

describe('Microservice 04: Exercise Tracker', () => {
  it('creates users and logs exercises with date filtering', () => {
    const service = new ExerciseTrackerService();
    const user = service.createUser('alexdev');

    assert.equal(user.username, 'alexdev');
    assert(typeof user._id === 'string');

    // Add first exercise
    const ex1 = service.addExercise(user._id, 'Running 5km', 25, '2024-01-01');
    assert.equal(ex1.description, 'Running 5km');
    assert.equal(ex1.duration, 25);
    assert.equal(ex1.date, 'Mon Jan 01 2024');

    // Add second exercise
    service.addExercise(user._id, 'Swimming', 45, '2024-02-01');

    // Retrieve logs with limit
    const logs = service.getLogs(user._id, { limit: 1 });
    assert.equal(logs.count, 1);
    assert.equal(logs.log.length, 1);
    assert.equal(logs.log[0].description, 'Running 5km');

    // Retrieve all logs
    const allLogs = service.getLogs(user._id);
    assert.equal(allLogs.count, 2);
    assert.equal(allLogs.log.length, 2);
  });
});
