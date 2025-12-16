/**
 * freeCodeCamp Backend Microservice 04: Exercise Tracker
 * In-memory / PostgreSQL-ready user and workout exercise logger with date/limit filtering.
 */

import crypto from 'node:crypto';

export interface User {
  username: string;
  _id: string;
}

export interface ExerciseEntry {
  description: string;
  duration: number;
  date: string; // toDateString() format: e.g. "Mon Jan 01 2024"
  rawDate: number; // unix timestamp for easy range filtering
}

export interface ExerciseResponse {
  username: string;
  description: string;
  duration: number;
  date: string;
  _id: string;
}

export interface ExerciseLogResponse {
  username: string;
  count: number;
  _id: string;
  log: Array<{
    description: string;
    duration: number;
    date: string;
  }>;
}

export class ExerciseTrackerService {
  private users: Map<string, User> = new Map();
  private userExercises: Map<string, ExerciseEntry[]> = new Map();

  public createUser(username: string): User {
    const trimmed = (username || '').trim();
    if (!trimmed) {
      throw new Error('Username is required');
    }

    const _id = crypto.randomBytes(12).toString('hex');
    const user: User = { username: trimmed, _id };

    this.users.set(_id, user);
    this.userExercises.set(_id, []);
    return user;
  }

  public getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  public addExercise(
    userId: string,
    description: string,
    duration: number | string,
    dateString?: string | null
  ): ExerciseResponse {
    const user = this.users.get(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const desc = (description || '').trim();
    if (!desc) {
      throw new Error('Description is required');
    }

    const dur = typeof duration === 'string' ? parseInt(duration, 10) : duration;
    if (isNaN(dur) || dur <= 0) {
      throw new Error('Duration must be a positive number');
    }

    let parsedDate: Date;
    if (dateString && dateString.trim() !== '') {
      parsedDate = new Date(dateString.trim());
      if (isNaN(parsedDate.getTime())) {
        parsedDate = new Date();
      }
    } else {
      parsedDate = new Date();
    }

    const formattedDate = parsedDate.toDateString();
    const entry: ExerciseEntry = {
      description: desc,
      duration: dur,
      date: formattedDate,
      rawDate: parsedDate.getTime()
    };

    const logs = this.userExercises.get(userId) || [];
    logs.push(entry);
    this.userExercises.set(userId, logs);

    return {
      username: user.username,
      description: desc,
      duration: dur,
      date: formattedDate,
      _id: user._id
    };
  }

  public getLogs(
    userId: string,
    options?: { from?: string; to?: string; limit?: string | number }
  ): ExerciseLogResponse {
    const user = this.users.get(userId);
    if (!user) {
      throw new Error('User not found');
    }

    let logs = this.userExercises.get(userId) || [];

    if (options?.from) {
      const fromTime = new Date(options.from).getTime();
      if (!isNaN(fromTime)) {
        logs = logs.filter((e) => e.rawDate >= fromTime);
      }
    }

    if (options?.to) {
      const toTime = new Date(options.to).getTime();
      if (!isNaN(toTime)) {
        logs = logs.filter((e) => e.rawDate <= toTime);
      }
    }

    if (options?.limit !== undefined) {
      const limitNum = typeof options.limit === 'string' ? parseInt(options.limit, 10) : options.limit;
      if (!isNaN(limitNum) && limitNum > 0) {
        logs = logs.slice(0, limitNum);
      }
    }

    return {
      username: user.username,
      count: logs.length,
      _id: user._id,
      log: logs.map((l) => ({
        description: l.description,
        duration: l.duration,
        date: l.date
      }))
    };
  }
}
