import PostCard from "./PostCard";

export default function ListePostsProfil({ posts }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow p-6 text-center text-gray-600">
        Aucun post pour le moment.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}