document.addEventListener("DOMContentLoaded", event => {
  //reflection: Do not assume that you will get only one result from your search. You in fact will get more than one sometimes

  //question: can I access a child element based on its id in dot/bracket notation?

  //build a JavaScript application which searches GitHub for users by name and displays the results on the screen

  // DELIVERABLES+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // The index.html file has a form with a search input. When the form is submitted, it should take the value of the input and search GitHub for user matches using the User Search Endpoint.

  //grab stuff we need
  form = document.getElementById("github-form");
  search = form.search;
  submit = form.submit;

  githubContainer = document.getElementById("github-container");
  userList = githubContainer.children[0];
  reposList = githubContainer.children[1];

  //handle event listeners
  const handleSubmit = event => {
    event.preventDefault();
    userList.innerHTML = "";
    //take text -> use get request in github api
    user = search.value;
    fetch(`https://api.github.com/search/users?q=${user}`)
      .then(resp => resp.json())
      .then(parsedSearch => handleSearch(parsedSearch));
  };

  const handleUserClick = event => {
    if ((event.target.tagName = "IMG")) {
      user = event.target.dataset.id;
      fetch(`https://api.github.com/users/${user}/repos`)
        .then(resp => resp.json())
        .then(parsedSearch => handleAvatarClick(parsedSearch));
    }
  };

  // Using the results of the search, display information about the users to the page. (You might include showing their username, avatar and a link to their profile.)
  const handleSearch = searchData => {
    //save interesting data=============================
    console.log(searchData);
    users = searchData.items;
    //access interesting data============================
    users.forEach(user => {
      avatar = user.avatar_url;
      name = user.login;
      link = user.html_url;
      repoList = user.repos_url;
      //create containers for data==========================
      userContainer = document.createElement("LI");
      avatarContainer = document.createElement("IMG");
      nameContainer = document.createElement("H1");
      linkContainer = document.createElement("A");
      repoContainer = document.createElement("UL");
      //fill containers with data============================
      userContainer.id = name;
      avatarContainer.src = avatar;
      avatarContainer.dataset.id = name;
      nameContainer.innerHTML = name;
      linkContainer.href = link;
      linkContainer.innerText = "Profile";
      //append everything==========================================
      userList.append(userContainer);
      userContainer.append(
        avatarContainer,
        nameContainer,
        linkContainer,
        repoContainer
      );
    });
  };

  const handleAvatarClick = allRepos => {
    allRepos.forEach(repo => {
      //grab interesting data
      name = repo.name;
      url = repo.html_url;
      // create containers
      singleRepoContainer = document.createElement("LI");
      repoLink = document.createElement("A");
      // fill containers
      repoLink.href = url;
      repoLink.innerText = name;
      // append
      repoContainer.append(singleRepoContainer);
      singleRepoContainer.append(repoLink);
    });
  };

  // add event listeners
  form.addEventListener("submit", handleSubmit);
  userList.addEventListener("click", handleUserClick);

  // Clicking on one of these users should send a request to the User Repos Endpoint and return data about all the repositories for that user.

  // Using the response from the Users Repos Endpoint, display all the repositories for that user on the page.
});
