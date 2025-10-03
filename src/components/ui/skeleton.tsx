import { cn } from '@/lib/utils';

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return <div className={cn('animate-pulse rounded-md bg-gray-200', className)} {...props} />;
};

export { Skeleton };
