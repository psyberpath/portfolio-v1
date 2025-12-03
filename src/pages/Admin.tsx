import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit3, LogOut } from 'lucide-react';
import { api } from '../lib/axios';

export default function Admin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => (await api.get('/posts')).data,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const token = localStorage.getItem('accessToken');
      return api.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F4F0E8] text-[#2D2D2D] pt-32 px-6 md:px-12 max-w-4xl mx-auto">

      <div className="flex justify-between items-end border-b border-[#D3D9D4] pb-6 mb-12">
        <div>
          <h1 className="font-tech text-3xl font-bold uppercase tracking-tight">System Control</h1>
          <p className="font-mono text-xs text-[#898681] mt-2">Manage transmissions and data entries.</p>
        </div>
        <div className="flex gap-4">
          <button onClick={handleLogout} className="p-2 hover:text-red-500 transition-colors" title="Logout">
            <LogOut size={20} />
          </button>
          <Link
            to="/admin/new"
            className="flex items-center gap-2 bg-[#2D2D2D] text-[#F4F0E8] px-4 py-2 rounded-sm hover:bg-[#C65D3B] transition-colors font-mono text-xs uppercase tracking-wider"
          >
            <Plus size={16} /> New Entry
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="font-mono text-sm animate-pulse">Loading data...</div>
      ) : (
        <div className="flex flex-col gap-4">
          {posts?.map((post: any) => (
            <div key={post.id} className="flex items-center justify-between p-6 bg-white border border-[#D3D9D4] rounded-sm hover:shadow-md transition-all">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#2D2D2D]">{post.title}</h3>
                <span className="font-mono text-xs text-[#898681]">
                  /{post.slug} • {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Link to={`/admin/edit/${post.id}`} className="text-[#898681] hover:text-[#2D2D2D] transition-colors">
                  <Edit3 size={18} />
                </Link>
                <button
                  onClick={() => {
                    if (confirm('Delete this signal?')) deleteMutation.mutate(post.id);
                  }}
                  className="text-[#898681] hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          {posts?.length === 0 && (
            <div className="text-center py-20 font-mono text-[#898681]">
              No signals found. Initialize first transmission.
            </div>
          )}
        </div>
      )}
    </div>
  );
}