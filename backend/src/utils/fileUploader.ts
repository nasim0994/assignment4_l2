import multer from 'multer';

export const fileUploader = (uploadPath: string) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, process.cwd() + `/uploads/${uploadPath}`);
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  return multer({
    storage: storage,
  });
};
