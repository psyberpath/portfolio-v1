import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../lib/axios';
import { Save, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

export default function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const { data: postData, isSuccess } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const res = await api.get(`/posts/${id}`);
      return res.data;
    },
    enabled: isEditing,
  });

  useEffect(() => {
    if (isSuccess && postData) {
      setTitle(postData.title);
      setContent(postData.content);
    }
  }, [isSuccess, postData]);

  const saveMutation = useMutation({
    mutationFn: async (data: { title: string; content: string }) => {
      
      if (isEditing) {
        return api.patch(`/posts/${id}`, data);
      } else {
        return api.post('/posts', data);
      }
    },
    onSuccess: () => {
      navigate('/admin');
    },
    onError: (error: any) => {
      console.log('Full Error Object:', error);
      console.log('Full Error Object:', error);
      alert(`Publish Failed: ${error.response?.data?.message || error.message}`);
    }
  });

  const handleSave = () => {
    if (!title) return alert('Please enter a title');
    if (!content) return alert('Please enter some content');
    
    saveMutation.mutate({ title, content });
  };


  return (
    <div className="min-h-screen bg-[#F4F0E8] flex flex-col">

      <div className="fixed top-0 left-0 right-0 h-16 bg-[#F4F0E8]/90 backdrop-blur-md border-b border-[#D3D9D4] flex items-center justify-between px-6 z-50">
        <button onClick={() => navigate('/admin')} className="text-[#898681] hover:text-[#2D2D2D] flex items-center gap-2 font-mono text-xs uppercase">
          <ArrowLeft size={16} /> Cancel
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="text-[#898681] hover:text-[#C65D3B] transition-colors"
            title="Toggle Preview"
          >
            {showPreview ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          <button
            onClick={handleSave}
            disabled={saveMutation.isPending}
            className="bg-[#2D2D2D] text-[#F4F0E8] px-6 py-2 rounded-full hover:bg-[#C65D3B] transition-colors font-mono text-xs uppercase tracking-wider flex items-center gap-2"
          >
            {saveMutation.isPending ? 'Saving...' : <><Save size={16} /> Publish</>}
          </button>
        </div>
      </div>

      <div className="flex-grow pt-24 px-6 md:px-12 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 h-[calc(100vh-6rem)]">

        <div className={`flex flex-col gap-6 ${showPreview ? 'hidden md:flex' : 'flex'}`}>
          <input
            type="text"
            placeholder="Transmission Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent text-4xl md:text-5xl font-serif font-bold placeholder:text-[#D3D9D4] focus:outline-none text-[#2D2D2D]"
          />
          <textarea
            placeholder="// Write your logic here (Markdown supported)..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-grow bg-transparent resize-none font-mono text-sm leading-relaxed focus:outline-none text-[#2D2D2D] placeholder:text-[#D3D9D4]"
          />
        </div>

        <div className={`
          ${showPreview ? 'flex' : 'hidden md:flex'} 
          flex-col border-l border-[#D3D9D4] pl-12 overflow-y-auto custom-scrollbar
        `}>
          <div className="prose prose-stone prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-code:font-mono prose-pre:bg-[#EBE7DF] prose-pre:text-[#2D2D2D]">
            <h1 className="font-serif text-4xl mb-8">{title || 'Untitled'}</h1>
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
              {content || '*Preview will appear here...*'}
            </ReactMarkdown>
          </div>
        </div>

      </div>
    </div>
  );
}