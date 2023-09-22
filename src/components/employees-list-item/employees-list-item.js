import './employees-list-item.css';

const EmployeesListItem = (props) => {

    const {name, salary, onDelete, onToggleProp, rise, increase, onSalaryChange} = props; //onToggleProp - альтернатива onToggleIncrease и onTogglePromotion

    let classNames = "list-group-item d-flex justify-content-between";
    if(rise){
        classNames += ' like'
    }
    if(increase){
        classNames += ' increase';
    }

    return (
        <li className= {classNames}>
            <span 
                onClick={onToggleProp}
                data-toggle="rise"
                className="list-group-item-label">{name}
            </span>
            <input 
                type="text" 
                className="list-group-item-input" 
                defaultValue={salary + "$"}
                onChange={(e) => onSalaryChange(parseFloat(e.target.value))}
            />
            <div className='d-flex justify-content-center align-items-center'>
                <button 
                    type="button"
                    className="btn-cookie btn-sm "
                    onClick={onToggleProp}
                    data-toggle="increase">
                    <i className="fas fa-cookie"></i>
                </button>

                <button type="button"
                        className="btn-trash btn-sm "
                        onClick={onDelete}>
                    <i className="fas fa-trash"></i>
                </button>
                <i className="fas fa-star"></i>
            </div>
        </li>
    )
}

export default EmployeesListItem;