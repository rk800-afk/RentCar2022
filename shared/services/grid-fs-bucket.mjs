import mongodb from 'mongodb';
import mongoose from 'mongoose';
import Grid from 'gridfs-stream';

class GridFSBucketService {
  get find() {
    return this.gfs.find;
  }

  get delete() {
    return this.gfs.delete;
  }

  get openDownloadStreamByName() {
    return this.gfs.openDownloadStreamByName;
  }

  readStream(filename, res) {
    return this.gfs.createReadStream(filename).pipe(res);
  }

  filesFindAll() {
    return this.gfs.files.find;
  }

  filesFindOne() {
    return this.gfs.files.findOne;
  }

  init(db) {
    this.gfs = new mongodb.GridFSBucket(db, {
      bucketName: 'file'
    });
  }
}

const gridFSBucketService = new GridFSBucketService();

export {
  GridFSBucketService,
  gridFSBucketService
};
