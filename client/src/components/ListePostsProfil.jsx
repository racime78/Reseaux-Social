import PostCard from "./PostCard";

export default function ListePostsProfil({ posts }) {
  if (!posts || posts.length === 0) {
  return (
    <div className="bg-white border border-blue-100 rounded-3xl shadow-sm p-8 text-center text-slate-500">
      Aucun post pour le moment.
    </div>
  );
}

return (
  <div className="space-y-5">
    {posts.map((post) => (
      <PostCard key={post._id} post={post} />
    ))}
  </div>
);
}