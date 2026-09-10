function Statcard(props){
    return(
        <div className="stat-card">
            <span className="stat-icon">{props.icon}</span>
            <h3 className="stat-title">{props.title}</h3>
            <h2 className="stat-value">{props.value}</h2>
        </div>
    )
}

export default Statcard;