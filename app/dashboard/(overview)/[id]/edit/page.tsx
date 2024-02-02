import Form from '@/app/ui/case-studies/edit-form';
import Breadcrumbs from '@/app/ui/case-studies/breadcrumbs';
import { fetchCaseStudyById, fetchCustomers } from '@/app/lib/data';
 
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [caseStudy, customers] = await Promise.all([
    fetchCaseStudyById(id),
    fetchCustomers(),
  ]);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Case Study', href: '/dashboard' },
          {
            label: 'Edit Case Study',
            href: `/dashboard/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form caseStudy={caseStudy} customers={customers} />
    </main>
  );
}