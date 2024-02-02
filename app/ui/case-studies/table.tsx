'use client';

import Image from 'next/image';
import { UpdateCaseStudy, DeleteCaseStudy } from '@/app/ui/case-studies/buttons';
import CaseStudyStatus from '@/app/ui/case-studies/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import React, { useState, useEffect } from 'react';

export default async function CaseStudyTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/list')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {data.map((data, index) => (
              <div key={index} className="mb-2 w-full rounded-md bg-white p-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{data.Key}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      Last Modified: {data.LastModified}
                    </p>
                  </div>
                  <p>ETag: {data.ETag}</p>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      Checksum Algorithm: {data.ChecksumAlgorithm.join(', ')}
                    </p>
                    <p>Size: {data.Size} bytes</p>
                  </div>
                  <p>Storage Class: {data.StorageClass}</p>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Key
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Last Modified
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  ETag
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Checksum Algorithm
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Size
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Storage Class
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.map((data, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{data.Key}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {data.LastModified}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{data.ETag}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {data.ChecksumAlgorithm.join(', ')}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{data.Size} bytes</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {data.StorageClass}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
  
}
