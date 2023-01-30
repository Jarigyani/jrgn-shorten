import { UrlPare } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const TableOfUrls = () => {
  const session = useSession();

  const handleClick = async (pare: UrlPare) => {
    await fetch('/api/deletepare', {
      method: 'POST',
      body: '',
    });
  };

  const [urlPares, setUrlPares] = useState<UrlPare[]>([]);
  useEffect(() => {
    fetch('/api/getallurls', {
      method: 'POST',
      body: JSON.stringify({
        email: session.data?.user?.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data: ', data);
        return setUrlPares(data);
      });
  }, []);
  return (
    <div className='overflow-x-auto'>
      <table className='table w-full'>
        <thead>
          <tr>
            <th></th>
            <th>Generated URL</th>
            <th>Redirect URL</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {urlPares.map((pare) => (
            <tr key={pare.id}>
              <th>{urlPares.findIndex((p) => p.id === pare.id) + 1}</th>
              <td>localhost:3000/{pare.id}</td>
              <td className=''>
                <span>http://{pare.url}</span>
              </td>
              <td>
                <button
                  className='btn btn-error'
                  onClick={() => {
                    handleClick(pare);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableOfUrls;
