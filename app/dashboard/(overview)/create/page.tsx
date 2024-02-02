import Form from '@/app/ui/case-studies/create-form';
import Breadcrumbs from '@/app/ui/case-studies/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Case Studies', href: '/dashboard' },
          {
            label: 'Create Case Study',
            href: '/dashboard/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}