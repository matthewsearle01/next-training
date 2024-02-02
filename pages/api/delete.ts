// import type { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { id } = req.query;

//   const externalServiceUrl = process.env.EXTERNAL_SERVICE_URL;

//   const response = await fetch(`${externalServiceUrl}/doc_store/delete/${id}`, {
//     method: 'DELETE',
//   });

//   if (!response.ok) {
//     res.status(500).json({ error: 'Failed to delete document' });
//     return;
//   }

//   res.status(200).json({ message: 'Document deleted successfully' });
// }
