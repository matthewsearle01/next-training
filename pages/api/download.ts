// import type { NextApiRequest, NextApiResponse } from 'next';
// import fetch from 'node-fetch';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { id } = req.query;

//   const url = `YOUR_EXTERNAL_SERVICE_URL/doc_store/download/${id}`;
//   const response = await fetch(url);

//   if (!response.ok) {
//     res.status(404).json({ error: 'Document not found' });
//     return;
//   }

//   res.setHeader('Content-Type', response.headers.get('Content-Type') || 'application/octet-stream');
//   response.body.pipe(res);
// }
