import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const externalServiceUrl = process.env.EXTERNAL_SERVICE_URL;

  // const response = await fetch(`https://swapi.dev/api/planets/1/`);
  const response = await fetch(`${externalServiceUrl}/doc_store/list`);

  if (!response.ok) {
    res.status(500).json({ error: 'Failed to fetch document list' });
    return;
  }

  const documents = await response.json();
  res.status(200).json(documents);
}
