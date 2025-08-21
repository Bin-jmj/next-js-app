'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  // Function to handle search input changes
  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching...${term}`);
    // Implement search logic here
    const params = new URLSearchParams(searchParams);
    params.set('page', '1'); // Reset to the first page on new search
    if(term) {
      params.set('query', term);
    }else {
      params.delete('query');
    }
    // Update the URL with the new search term
    replace(`${pathname}?${params.toString()}`);
  }, 400);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => { handleSearch(e.target.value)}}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}

// function useDebouncedCallback(callback: (term: string) => void, delay: number) {
//   const timer = useRef<NodeJS.Timeout | null>(null);

//   return (term: string) => {
//     if (timer.current) {
//       clearTimeout(timer.current);
//     }
//     timer.current = setTimeout(() => {
//       callback(term);
//     }, 300);
//   };
// }

