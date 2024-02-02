// import { NextApiRequest, NextApiResponse } from 'next';
// import { createRouter } from 'next-connect';
// import formidable from 'formidable';

// // Extend the NextApiRequest type to include the file data
// interface ExtendedNextApiRequest extends NextApiRequest {
//   files?: formidable.Files;
// }

// const router = createRouter<ExtendedNextApiRequest, NextApiResponse>();

// router.post(async (req, res) => {
//   const form = new formidable.IncomingForm();
//   form.uploadDir = "./uploads"; // Temporary directory for uploaded files
//   form.keepExtensions = true; // Keep file extension

//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       res.status(500).json({ error: 'Error parsing the files' });
//       return;
//     }
//     // Here, you would handle the uploaded file(s) as needed
//     // For example, you might save file information in your database
//     // and/or upload the files to a cloud storage service like AWS S3

//     res.status(200).json({ message: 'Files uploaded successfully', files });
//   });
// });

// export default router.handler();

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
