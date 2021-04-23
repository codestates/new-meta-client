import dotenv from "dotenv";

dotenv.config();

let domain: string | undefined;
if (process.env.NODE_ENV === "development") {
  domain = process.env.REACT_APP_LOCAL_SERVER_DOMAIN;
} else {
  domain = process.env.REACT_APP_EC2_SERVER_DOMAIN;
}

const API = {
  user_login_test: `${domain}/users/login`,
  user_logout_test: `${domain}/users/logout`,
  user_register_test: `${domain}/users`,
  user_profile_test: `${domain}/users/me`,
  user_update_test: `${domain}/users/me`,
  user_delete_test: `${domain}/users/me`,
  summonerInfo: `${domain}/summoners/summonerInfo`,

  allChampionInfo:
    "https://ddragon.leagueoflegends.com/cdn/11.8.1/data/ko_KR/champion.json",
  championInfo:
    "https://ddragon.leagueoflegends.com/cdn/11.8.1/data/ko_KR/champion", // + 챔피언 영문명 ex) Bard.json
  championSplash: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash", // + 챔피언 영문명_스킨 아이디 값 ex) Aatrox_1.jpg
  championLoading:
    "https://ddragon.leagueoflegends.com/cdn/img/champion/loading", // ex) Aatrox_0.jpg
  championSquare: "https://ddragon.leagueoflegends.com/cdn/11.8.1/img/champion", // Aatrox.png
  championSpell: "https://ddragon.leagueoflegends.com/cdn/11.8.1/img/spell", // BardQ.png
};
export default API;
