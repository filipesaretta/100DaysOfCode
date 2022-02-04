const basePointGithub = 'https://api.github.com';
const userEndPoint = `${basePointGithub}/users`;

const showUserGit = document.querySelector('.userGit');

function handleError(err) {
  console.log(err);
}

async function displayUser(username) {  
  showUserGit.textContent = 'loading...';

  const response = await fetch(`${userEndPoint}/${username}`);
  const data = await response.json();
  console.log(data);
  showUserGit.textContent = `${data.name} - Followers ${data.followers}`
  
}

displayUser('filipesaretta').catch(handleError);