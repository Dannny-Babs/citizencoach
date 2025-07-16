// Storage utilities for CitizenCoach app

export interface StorageData {
  flashcards?: any[];
  chatHistory?: any[];
  userProgress?: any;
  settings?: any;
}

export class Storage {
  private static isClient = typeof window !== "undefined";

  static get<T>(key: string, defaultValue: T): T {
    if (!this.isClient) return defaultValue;

    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue;

      const parsed = JSON.parse(item);
      return parsed;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return defaultValue;
    }
  }

  static set<T>(key: string, value: T): boolean {
    if (!this.isClient) return false;

    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
      return false;
    }
  }

  static remove(key: string): boolean {
    if (!this.isClient) return false;

    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
      return false;
    }
  }

  static clear(): boolean {
    if (!this.isClient) return false;

    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing localStorage:", error);
      return false;
    }
  }

  static getSize(): number {
    if (!this.isClient) return 0;

    try {
      let total = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          total += localStorage[key].length + key.length;
        }
      }
      return total;
    } catch (error) {
      console.error("Error calculating localStorage size:", error);
      return 0;
    }
  }

  static exportData(): StorageData | null {
    if (!this.isClient) return null;

    try {
      return {
        flashcards: this.get("citizencoach-flashcards", []),
        chatHistory: this.get("citizencoach-chat-history", []),
        userProgress: this.get("citizencoach-progress", {}),
        settings: this.get("citizencoach-settings", {}),
      };
    } catch (error) {
      console.error("Error exporting data:", error);
      return null;
    }
  }

  static importData(data: StorageData): boolean {
    if (!this.isClient) return false;

    try {
      if (data.flashcards) {
        this.set("citizencoach-flashcards", data.flashcards);
      }
      if (data.chatHistory) {
        this.set("citizencoach-chat-history", data.chatHistory);
      }
      if (data.userProgress) {
        this.set("citizencoach-progress", data.userProgress);
      }
      if (data.settings) {
        this.set("citizencoach-settings", data.settings);
      }
      return true;
    } catch (error) {
      console.error("Error importing data:", error);
      return false;
    }
  }
}

// Convenience functions for specific data types
export const flashcardStorage = {
  get: () => Storage.get("citizencoach-flashcards", []),
  set: (flashcards: any[]) =>
    Storage.set("citizencoach-flashcards", flashcards),
  clear: () => Storage.remove("citizencoach-flashcards"),
};

export const chatStorage = {
  get: () => Storage.get("citizencoach-chat-history", []),
  set: (history: any[]) => Storage.set("citizencoach-chat-history", history),
  clear: () => Storage.remove("citizencoach-chat-history"),
};

export const progressStorage = {
  get: () => Storage.get("citizencoach-progress", {}),
  set: (progress: any) => Storage.set("citizencoach-progress", progress),
  clear: () => Storage.remove("citizencoach-progress"),
};

export const settingsStorage = {
  get: () =>
    Storage.get("citizencoach-settings", {
      theme: "light",
      notifications: true,
      autoSaveFlashcards: true,
    }),
  set: (settings: any) => Storage.set("citizencoach-settings", settings),
  clear: () => Storage.remove("citizencoach-settings"),
};
