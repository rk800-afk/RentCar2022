import { gridFSBucketService } from '../../../shared/services/grid-fs-bucket.mjs'

// Model of the collection 'defibrillators'
import Car from '../../../db/models/Car.js';

// Handler for server error
import { resServerError } from '../../../shared/utils/index.js';

export const getImage = async (req, res) => {
  try {
    gridFSBucketService.gfs.find({ filename: new RegExp(req.params.imageName, 'i') })
      .toArray((err, files) => {
        if (!files || files.length === 0) {
          return res.status(404).json({
            message: `Зображення з даним іменем відсутнє. ${err}`
          });
        }
        gridFSBucketService.gfs
          .openDownloadStreamByName(files[0].filename)
          .pipe(res)
      });
  } catch (e) {
    resServerError(res, e)
  }
};

export const createImage = async (req, res) => {
  try {
    const newImage = req.file

    if (!newImage) {
      res.status(400).json({
        message: "You Must Set Image"
      });
      return
    }
    const imgUrl = `/api/image/${newImage.filename}`

    const cars = await Car.findByIdAndUpdate(
      req.params.carId,
      {
        image: { filename: imgUrl }
      },
      { new: true }
    );

    res.status(201).json({
      cars,
      imgUrl
    });
  } catch (e) {
    resServerError(res, e);
  }
};

export const removeImage = async (req, res) => {
  try {
    await Car.findByIdAndUpdate(
      req.params.carId,
      {
        image: {}
      },
      { new: true }
    );
    res.status(200).json({ message: "Succ" })
  } catch (e) {
    resServerError(res, e)
  }
};
