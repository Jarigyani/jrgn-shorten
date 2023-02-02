import { urlParesAtom } from '@/atoms';
import { UrlPare } from '@prisma/client';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { MouseEvent, useEffect } from 'react';
import { HiOutlineClipboardCopy } from 'react-icons/hi';

type Props = {
  user?:
    | {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      }
    | undefined;
};

const TableOfUrls = ({ user }: Props) => {
  const handleClick = async (pare: UrlPare) => {
    await fetch('/api/deletepare', {
      method: 'POST',
      body: JSON.stringify({
        id: pare.id,
      }),
    });

    fetch('/api/getallurls', {
      method: 'POST',
      body: JSON.stringify({
        email: user?.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data: ', data);
        return setUrlPares(data);
      });
  };

  const handleCopy = (e: MouseEvent<SVGElement, globalThis.MouseEvent>) => {
    const text =
      e.currentTarget.parentElement?.parentElement?.children[2].textContent;
    navigator.clipboard.writeText(text as string);
  };

  const [urlPares, setUrlPares] = useAtom(urlParesAtom);

  useEffect(() => {
    try {
      fetch('/api/getallurls', {
        method: 'POST',
        body: JSON.stringify({
          email: user?.email,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) return console.log(data.error);
          return setUrlPares(data);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <div className='overflow-x-auto'>
      <table className='table w-full'>
        <thead>
          <tr>
            <th></th>
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
              <td>
                <HiOutlineClipboardCopy
                  className='w-5 h-5 cursor-pointer'
                  onClick={(e) => {
                    handleCopy(e);
                  }}
                />
              </td>
              <td>
                <Link href={`/${pare.id}`}>jrgn.jp/{pare.id}</Link>
              </td>
              <td>
                <span>https://{pare.url}</span>
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
