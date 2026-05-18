import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/axios";
import PostCard from "../components/PostCard";

export default function DetailPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data.post);
      } catch (e) {
        setPost(null);
      } finally {
        setChargement(false);
      }
    }

    fetchPost();
  }, [id]);

  if (chargement) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-white border border-blue-100 rounded-3xl p-8 shadow-sm text-slate-500">
          Chargement...
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-white border border-blue-100 rounded-3xl p-8 shadow-sm text-slate-500">
          Post introuvable
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <PostCard post={post} />
      </div>
    </div>
  );
}