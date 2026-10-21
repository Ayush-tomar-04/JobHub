
function EmployerStatcard(props){
    return(
        <div className="employer-statcard">
            <span>{props.icon}</span>
            <h2>{props.title}</h2>
            <h2>{props.value}</h2>
        </div>
    )
}
export default EmployerStatcard