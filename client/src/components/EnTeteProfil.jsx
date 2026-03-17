export default function EnTeteProfil({
  profil,
  estMonProfil,
  auClicSuivre,
  auClicNePlusSuivre,
}) {
  if (!profil) return null;

  const {
    username,
    bio,
    avatar,
    followersCount = 0,
    followingCount = 0,
    estSuiviParMoi = false,
  } = profil;

  return (
    <div className="bg-white rounded-2xl shadow p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={avatar || "https://via.placeholder.com/100x100?text=Avatar"}
            alt={`Avatar de ${username}`}
            className="w-24 h-24 rounded-full object-cover border"
          />

          <div>
            <h1 className="text-2xl font-bold text-gray-900">{username}</h1>
            <p className="text-gray-600 mt-2">
              {bio || "Cet utilisateur n’a pas encore ajouté de bio."}
            </p>

            <div className="flex gap-6 mt-4 text-sm text-gray-700">
              <span>
                <strong>{followersCount}</strong> followers
              </span>
              <span>
                <strong>{followingCount}</strong> following
              </span>
            </div>
          </div>
        </div>

        <div>
          {estMonProfil ? (
            <button className="px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition">
              Modifier le profil
            </button>
          ) : estSuiviParMoi ? (
            <button
              onClick={auClicNePlusSuivre}
              className="px-4 py-2 rounded-xl border border-gray-300 text-gray-800 hover:bg-gray-100 transition"
            >
              Ne plus suivre
            </button>
          ) : (
            <button
              onClick={auClicSuivre}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Suivre
            </button>
          )}
        </div>
      </div>
    </div>
  );
}