export default function Loading() {
  return (
    <div className='flex h-full items-center justify-center space-x-2'>
      <div className='h-4 w-4 animate-pulse rounded-full bg-black'></div>
      <div className='h-4 w-4 animate-pulse rounded-full bg-black'></div>
      <div className='h-4 w-4 animate-pulse rounded-full bg-black'></div>
    </div>
  );
}
