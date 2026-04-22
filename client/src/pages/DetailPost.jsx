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

  if (chargement) return <p className="p-4">Chargement...</p>;
  if (!post) return <p className="p-4">Post introuvable</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <PostCard post={post} />
      </div>
    </div>
  );
}