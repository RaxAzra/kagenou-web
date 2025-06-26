const fs = require('fs');
const fetch = require('node-fetch');

async function updateSoraStats() {
  const res = await fetch('https://api.tiklydown.eu.org/api/stalk?user=sorawangyy');
  const json = await res.json();
  const stats = json.data.stats;
  const user = json.data.user;

  const data = {
    sora: {
      username: `@${user.uniqueId}`,
      nickname: user.nickname,
      followers: stats.followerCount,
      likes: stats.heartCount
    }
  };

  fs.writeFileSync('database/stats.json', JSON.stringify(data, null, 2));
  console.log('✅ stats.json updated successfully');
}

updateSoraStats();
