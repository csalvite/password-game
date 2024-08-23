import Image from 'next/image';

interface LoaderProps {
  className?: string;
}

const Loader = ({ className }: LoaderProps) => {
  return (
    <Image
      className={className}
      src='/tail-spin.svg'
      alt='Loader'
      width={30}
      height={50}
    />
  );
};

export default Loader;
