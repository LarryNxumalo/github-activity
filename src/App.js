// import logo from './logo.svg';
import { useState, useEffect } from "react"
import axios from "axios";
import RepoDetails from "./RepoDetails";
import Dexie from 'dexie'


// import { Offline, Online } from 'react-detect-offline'
import './App.css';

function App() {

	const [username, setUsername] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [repos, setRepos] = useState([]);
	const [details, setDetails] = useState({});
	const [detailsLoading, setDetailsLoading] = useState(false);

	//useEffect hook to clear previous username repos and Details to am empty object and array when username state changes
	useEffect(() => {
		setRepos([]);
		setDetails({});
		setError(false)
	}, [username]);

	// indexedDB using dexie
	const db = new Dexie("git_database");
	db.version(1).stores({
		gitUsers: 'username,repos'
	});

	function handleSubmit(e){
		e.preventDefault();
		searchRepos();
	};

	function searchRepos(){
		setLoading(true);
		var gituser = db.gitUsers.get(username);

		if(!gituser.length){
			axios({
				method: "get",
				url: `https://api.github.com/users/${username}/repos`,
			})
			.then(res => {
				// console.log(res)
				db.gitUsers.put({username: username, repos: res.data})
				alert('this user was loaded from github')
				// console.log(repos)
				setLoading(false);
				setRepos(res.data);
			})
			.catch(error => {
				setLoading(false);
				setError(true);
			});
		}
		else {
			var repos = gituser.repos
			setRepos(repos);
			alert('this user was loaded from the indexdb')
		}
	}

	function renderRepo(repo){
		return (
			<div className="row" onClick={() => getDetails(repo.name)} key={repo.id}>
				<h2 className="repo-name">
					{repo.name}
				</h2>
			</div>
		);
	}

	function getDetails(repoName){
		setDetailsLoading(true);
		axios({
			method: "get",
			url: `https://api.github.com/repos/${username}/${repoName}`,
		})
		.then(res => {
			setDetailsLoading(false);
			setDetails(res.data);
		});
	}

	if(error){
		return(
			<div className="App">
			<div className="page-wrapper">
				<div className="top-left">
					<form className="form">
						<input
						className="input"
						value={username}
						placeholder="Github Username"
						onChange={e => setUsername(e.target.value)}
						/>
						<button className="button" onClick={handleSubmit}>{loading ? "Searching...": "Search"}</button>
					</form>
					<div className="results-container">
						<h1>Sorry! there is No Such User as {username}</h1>
					</div>
				</div>
				<RepoDetails details={details} loading={detailsLoading}/>
			</div>
		</div>
		)
	}

	return (
		<div className="App">
			<div className="page-wrapper">
				<div className="top-left">
					<form className="form">
						<input
						className="input"
						value={username}
						placeholder="Github Username"
						onChange={e => setUsername(e.target.value)}
						/>
						<button className="button" onClick={handleSubmit}>{loading ? "Searching...": "Search"}</button>
					</form>
					<div className="results-container" >
						<h1>Repos</h1>
						{repos.map(renderRepo)}
					</div>
				</div>
				<RepoDetails details={details} loading={detailsLoading}/>
			</div>
		</div>
	);
}

export default App;
