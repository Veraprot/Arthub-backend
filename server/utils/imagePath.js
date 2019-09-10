exports.generate = (imageName) => {
  return imageName.split(' ').join('-')
}

// export const uploadService = multer({ storage: multer.memoryStorage() });


// router.post("/", uploadService.single('file'), function (req, res) {
//   var uploadedFile = req.file;
// });
// 1
