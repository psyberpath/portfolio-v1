import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/axios';
import { cn } from '../lib/utils';

export default function HealthCheck() {
  const { data, isError } = useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      const res = await api.get('/health');
      return res.data;
    },
    refetchInterval: 30000,
    retry: false,
  });

  const isHealthy = data?.status === 'ok' && !isError;

  return (
    <div className="flex items-center gap-2 text-xs font-mono text-stone uppercase tracking-wider">
      <div className="relative flex h-2 w-2">
        {isHealthy && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        )}
        <span
          className={cn(
            "relative inline-flex rounded-full h-2 w-2",
            isHealthy ? "bg-green-500" : "bg-red-500"
          )}
        ></span>
      </div>
      <span>{isHealthy ? "Systems Nominal" : "System Offline"}</span>
    </div>
  );
}
