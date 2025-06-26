const fs = require('fs');
const fetch = require('node-fetch');

// Daftar admin dan username TikTok-nya
const admins = {
  sora: 'sorawangyy',
  ranz: 'y.rexyz',
};

async function fetchStats(username) {
  const res = await fetch(`https://api.tiklydown.eu.org/api/stalk?user=${username}`);
  const json = await res.json();
  if (!json || !json.data || !json.data.stats) return null;

  const user = json.data.user;
  const stats = json.data.stats;

  return {
    username: `@${user.uniqueId}`,
    nickname: user.nickname,
    followers: stats.followerCount,
    likes: stats.heartCount
  };
}

(async () => {
  const result = {};

  for (const [key, tiktokUser] of Object.entries(admins)) {
    const data = await fetchStats(tiktokUser);
    if (data) result[key] = data;
  }

  fs.writeFileSync('database/stats.json', JSON.stringify(result, null, 2));
  console.log('✅ stats.json updated with multi-admin data!');
})();
