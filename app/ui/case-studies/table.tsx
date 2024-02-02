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
            {data && data.name && (
              <div key={data.name} className="mb-2 w-full rounded-md bg-white p-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{data.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{data.climate}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">{data.diameter}</p>
                    <p>{data.gravity}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <p>{data.orbital_period}</p>
                    <p>{data.population}</p>
                    <p>{data.rotation_period}</p>
                    <p>{data.surface_water}</p>
                    <p>{data.terrain}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Climate
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Diameter
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Gravity
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Orbital Period
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Population
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Rotation Period
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Surface Water
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Terrain
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data && data.name && (
                <tr>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{data.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {data.climate}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {data.diameter}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {data.gravity}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {data.orbital_period}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {data.population}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {data.rotation_period}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {data.surface_water}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {data.terrain}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
}
