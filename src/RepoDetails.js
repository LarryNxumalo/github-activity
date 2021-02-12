

function RepoDetails({ details, loading }){
	if(loading){
		return (
			<div className="loader">
				<h1>Loading Info...</h1>
			</div>
		)
	}

		return (
			<div className="repo-details-container">
				<div className="details-row">
					<label className="label">Repo-Name:</label>
					<span className="value">{ details.name }</span>
				</div>
				<div className="details-row">
					<label className="label">Description:</label>
					<span className="value">{ details.description }</span>
				</div>
				<div className="details-row">
					<label className="label">Forks Count:</label>
					<span className="value">{ details.forks }</span>
				</div>
				<div className="details-row">
					<label className="label">Language:</label>
					<span className="value">{ details.language }</span>
				</div>
				<div className="details-row">
					<label className="label">Stars:</label>
					<span className="value">{ details.stargazers_count }</span>
				</div>
				<div className="details-row">
					<label className="label">Subscribers:</label>
					<span className="value">{ details.subscribers_count }</span>
				</div>
				<div className="details-row">
					<label className="label">Updated At:</label>
					<span className="value">{ details.updated_at}</span>
				</div>
				<div className="details-row">
					<label className="label">Open Issues:</label>
					<span className="value">{ details.open_issues}</span>
				</div>
			</div>
		)
}

export default RepoDetails;