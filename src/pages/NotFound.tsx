import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="font-mono text-9xl font-bold text-[#EBE7DF] select-none">404</h1>
      
      <div className="absolute z-10 flex flex-col items-center gap-6">
        <div className="font-mono text-red-500 uppercase tracking-widest text-xs border border-red-500 px-3 py-1 rounded-full animate-pulse">
          Signal Lost
        </div>
        
        <h2 className="font-serif text-4xl text-[#2D2D2D]">
          The resource you requested<br /> has been de-allocated.
        </h2>
        
        <Link 
          to="/" 
          className="mt-4 border-b border-[#2D2D2D] hover:border-[#C65D3B] hover:text-[#C65D3B] transition-colors font-mono text-sm pb-1"
        >
          _return_to_index
        </Link>
      </div>
    </div>
  );
}