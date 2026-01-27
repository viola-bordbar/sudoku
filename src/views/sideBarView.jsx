export function SideBarView(props) {
    return (
        <div>
            People: 
            {props.model.people} <br />

            Expenses: 
            {props.model.expenses.length} <br />

            Total sum of costs: {props.model.sumOfCosts} currency units
            Your total to pay: {/* TODO calculate user's total to pay */}
        </div>
    )
}