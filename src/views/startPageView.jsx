export function StartPageView(props) {

    function addNewPersonACB(){
        props.onShowPersonInput();
    }

    function personInputACB(e) {
        props.onPersonInputChange(e.target.value);
    }

    function addNewExpenseACB(){
        props.onShowExpenseInput();
    }

    function cancelExpenseACB(){
        props.onCancelExpense();
    }

    function expenseTitleInputACB(e) {
        props.onExpenseTitleInput(e.target.value);
    }

    function expenseAmountInputACB(e) {
        props.onExpenseAmountInput(e.target.value);
    }

    function paidByChangeACB(e) {
        props.onPaidByChange(e.target.value);
    }

    function participantsToggleACB(person) {
        props.onToggleParticipants(person);
    }

    function renderPeopleOptionsCB(person) {
        return (
            <option key={person} value={person}>
                {person}
            </option>
        );
    }

    function renderParticipantsForCheckboxCB(person) {
        return (
            <label key={person}>
                <input
                    type="checkbox"
                    checked={(props.selectedParticipants || []).includes(person)}
                    onChange={participantsToggleACB}
                />
                {person}
            </label>
        );
    }

    return (
        <div>
            <h1>Expense splitter</h1>

            <p>
                An app that can help you split expesnes between you and your friends, family or anyone. 
                Just input the people you want to split the expenses with, what the expenses are, and 
                how much they cost, and expense splitter will take care of the rest for you!
            </p>

            <button onClick={addNewPersonACB}>Add new person</button>

            {props.showPersonInput && (
                <input
                    value={props.newPerson || ""}
                    onChange={personInputACB}
                    placeholder="Enter name"
                />
            )}

            <button onClick={addNewExpenseACB}>Add new expense</button>

            {props.showExpenseInput && (
                <div>
                    <input
                        value={props.expenseTitle || ""}
                        onChange={expenseTitleInputACB}
                        placeholder="Enter expense title"
                    />

                    <input
                        value={props.expenseAmount || ""}
                        onChange={expenseAmountInputACB}
                        placeholder="Enter total amount"
                        type="number"
                        min="0"
                        step="0.01"
                    />

                    <div>
                        <label>Paid by</label>
                        <select value={props.paidBy || ""} onChange={paidByChangeACB}>
                            <option value="" disabled>
                                Select person
                            </option>
                            {(props.people || []).map(renderPeopleOptionsCB)}
                        </select>
                    </div>

                    <div> 
                        <div>Select participants</div>
                        <div>{(props.people || []).map(renderParticipantsForCheckboxCB)}</div>
                    </div>

                    <button onClick={addNewExpenseACB}>Add</button>
                    <button onClick={cancelExpenseACB} type="button">Cancel</button>
                </div>
            )}

        </div>
    )
}
