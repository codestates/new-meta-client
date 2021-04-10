// "editor.wordWrapColumn": 200,
const API = {
  user_login_test: "http://localhost:4000/users/login",
  user_logout_test: "http://localhost:4000/users/logout",
  user_register_test: "http://localhost:4000/users",
  user_profile_test: "http://localhost:4000/users/me",
  user_update_test: "http://localhost:4000/users/me",
  user_delete_test: "http://localhost:4000/users/me",
  allChampionInfo:
    "http://ddragon.leagueoflegends.com/cdn/11.7.1/data/ko_KR/champion.json",
  championInfo:
    "http://ddragon.leagueoflegends.com/cdn/11.7.1/data/ko_KR/champion", // + 챔피언 영문명 ex) Bard.json
  championSplash: "http://ddragon.leagueoflegends.com/cdn/img/champion/splash", // + 챔피언 영문명_스킨 아이디 값 ex) Aatrox_1.jpg
  championLoading:
    "http://ddragon.leagueoflegends.com/cdn/img/champion/loading", // ex) Aatrox_0.jpg
  championSquare: "http://ddragon.leagueoflegends.com/cdn/11.7.1/img/champion", // Aatrox.png
  championSpell: "http://ddragon.leagueoflegends.com/cdn/11.7.1/img/spell", // BardQ.png
};
export default API;
