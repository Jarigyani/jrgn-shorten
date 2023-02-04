import { sortedUrlParesAtom } from '@/atoms';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { MouseEvent, useState } from 'react';
import { HiOutlineClipboardCopy } from 'react-icons/hi';
import DeleteButton from './deleteButton';

const TableOfUrls = () => {
  const [copy, setCopy] = useState('copy');

  const handleCopy = (e: MouseEvent<SVGElement, globalThis.MouseEvent>) => {
    const text =
      e.currentTarget.parentElement?.parentElement?.parentElement?.children[2]
        .textContent;
    navigator.clipboard.writeText(text as string);
    setCopy('copied!');
    setTimeout(() => {
      setCopy('copy');
    }, 2000);
  };

  const [urlPares, setUrlPares] = useAtom(sortedUrlParesAtom);

  return (
    <div className='overflow-x-scroll hidden-scrollbar drop-shadow-md'>
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
                <div
                  className={`tooltip ${
                    copy === 'copied!' && 'tooltip-success'
                  }`}
                  data-tip={copy}
                >
                  <HiOutlineClipboardCopy
                    className='w-5 h-5 cursor-pointer'
                    onClick={(e) => {
                      handleCopy(e);
                    }}
                  />
                </div>
              </td>
              <td>
                <Link target='_blank' href={`/${pare.id}`}>
                  jrgn.jp/{pare.id}
                </Link>
              </td>
              <td>
                <span>
                  https://
                  {pare.url.length >= 20
                    ? `${pare.url.slice(0, 20)}...`
                    : pare.url}
                </span>
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
