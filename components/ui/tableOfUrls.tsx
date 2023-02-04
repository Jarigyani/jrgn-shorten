import { urlParesAtom, userAtom } from '@/atoms';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { MouseEvent } from 'react';
import { HiOutlineClipboardCopy } from 'react-icons/hi';
import DeleteButton from './deleteButton';

const TableOfUrls = () => {
  const [user, setUser] = useAtom(userAtom);

  const handleCopy = (e: MouseEvent<SVGElement, globalThis.MouseEvent>) => {
    const text =
      e.currentTarget.parentElement?.parentElement?.children[2].textContent;
    navigator.clipboard.writeText(text as string);
  };

  const [urlPares, setUrlPares] = useAtom(urlParesAtom);

  return (
    <div className='overflow-scroll'>
      <table className='mx-auto table text-center table-zebra'>
        <thead>
          <tr>
            <th>No.</th>
            <th>Copy</th>
            <th>Generated URL</th>
            <th>Redirect URL</th>
            <th>Delete</th>
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
                <DeleteButton pare={pare} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableOfUrls;
