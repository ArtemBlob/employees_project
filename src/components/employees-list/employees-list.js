import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';

const EmployeesList = ({data, onDelete, onToggleProp, onSalaryChange}) => { //onToggleProp - альтернатива onToggleIncrease и onTogglePromotion

    const elements = data.map(item => {
        const {id, ...itemProps} = item; //синтаксис частичной деструктуризации. Вытаскивается переменная id, а остальные пропсы объединяются в один массив itemProps.
        return (
            <EmployeesListItem 
            key={id} //атрибут key применяется при работе со списком одинаковых сущностей и необходим для правильной работы алгоритма согласования, который сравнивает старые и новые копии Dom дерева
            {...itemProps}
            onDelete={() => onDelete(id)}
            onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))} // данный код создает обработчик события, который вызывает функцию onToggleProp, передавая ей id и значение атрибута data-toggle элемента, на котором произошло событие. Это позволяет выполнить какие-либо действия в зависимости от элемента, на котором произошло событие, и передать эти данные в компонент родителя для обработки.
            onSalaryChange={newSalary => onSalaryChange(id, newSalary)}/> //передача функции с изменением зарплаты
        )
    })

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default EmployeesList;