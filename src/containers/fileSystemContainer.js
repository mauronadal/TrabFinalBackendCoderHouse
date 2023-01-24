import fs from 'fs';

class FileSystemContainer {
  constructor(fileRoute) {
    this.fileRoute = fileRoute;
  }

  viewFile = async () => {
    let object = [];
    try {
      object = await fs.promises.readFile(this.fileRoute, 'utf-8');
      if (object === '') object = [];
    } catch (error) {
      return [];
    }
    return JSON.parse(object);
  };
}

export default FileSystemContainer;
