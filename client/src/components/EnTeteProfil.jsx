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
    followersCount = 0,
    followingCount = 0,
    estSuiviParMoi = false,
  } = profil;

return (
  <div className="bg-white border border-blue-100 rounded-3xl shadow-sm p-7">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      
      <div>
        <h1 className="text-3xl font-bold text-blue-900">
          {username}
        </h1>

        <p className="text-slate-600 mt-3 leading-relaxed">
          {bio || "Cet utilisateur n’a pas encore ajouté de bio."}
        </p>

        <div className="flex gap-8 mt-5 text-sm">
          <span className="text-slate-600">
            <strong className="text-blue-900">
              {followersCount}
            </strong>{" "}
            followers
          </span>

          <span className="text-slate-600">
            <strong className="text-blue-900">
              {followingCount}
            </strong>{" "}
            following
          </span>
        </div>
      </div>

      {!estMonProfil && (
        <div>
          {estSuiviParMoi ? (
            <button
              onClick={auClicNePlusSuivre}
              className="px-5 py-2.5 rounded-xl border border-blue-100 bg-white text-slate-700 hover:bg-blue-50 transition"
            >
              Ne plus suivre
            </button>
          ) : (
            <button
              onClick={auClicSuivre}
              className="px-5 py-2.5 rounded-xl bg-blue-700 text-white hover:bg-blue-800 transition shadow-sm"
            >
              Suivre
            </button>
          )}
        </div>
      )}
    </div>
  </div>
);  
}