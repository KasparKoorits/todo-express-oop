import fs from "node:fs/promises";

class FileManager {
  async writeFile(filename, data) {
    try {
      data = JSON.stringify(data, null, 2);
      await fs.writeFile(filename, data);
    } catch (error) {
      console.error("write error =>", error);
    }
  }

  async readFile(filename) {
    try {
      const fileContent = await fs.readFile(filename, "utf-8");
      if (!fileContent) {
        return [];
      }
      const fileData = JSON.parse(fileContent);
      return fileData;
    } catch (error) {
      console.error("read error =>", error);
      return null;
    }
  }
}

export const fileManager = new FileManager();
