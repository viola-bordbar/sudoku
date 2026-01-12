import { StartPageView } from "../../views/startPageView";

export function StartPage(props) {
    //for people
    function handleShowPersonInputACB() {
        props.model.showPersonInput = true;
    }

    //check if add new person and handle person input are the same?
    function handlePersonInputACB(person) {
        props.model.newPerson = person;
    }

    function handleAddNewPersonACB() {
        props.model.addPerson();
    }

    //for expenses
    function handleShowExpenseInputACB() {
        props.model.showExpenseInput = true;
    }

    function handleExpenseTitleInputACB(title) {
        props.model.expenseTitle = title;
    }

    function handleExpenseAmountInputACB(value) {
        props.model.expenseAmount = value;
    }

    function handlePaidByChangeACB(person) {
        props.model.paidBy = person;
    }

    function handleToggleParticipantsACB(person) {
        props.model.toggleParticipants(person);
    }

    function handleAddExpenseACB() {
        props.model.addExpense();
    }

    function handleCancelExpenseACB() {
        props.model.cancelExpense();
    }

    return (
        <StartPageView
            people={props.model.people}
            expenses={props.model.expenses}
            
            showPersonInput={props.model.showPersonInput}
            newPerson={props.model.newPerson}
            onShowPersonInput={handleShowPersonInputACB}
            onPersonInput={handlePersonInputACB}
            onAddNewPerson={handleAddNewPersonACB}

            showExpenseInput={props.model.showExpenseInput}
            expenseTitle={props.model.expenseTitle}
            expenseAmount={props.model.expenseAmount}
            paidBy={props.model.paidBy}
            selectedParticipants={props.model.selectedParticipants || []}
            onShowExpenseInput={handleShowExpenseInputACB}
            onExpenseTitleInput={handleExpenseTitleInputACB}
            onExpenseAmountInput={handleExpenseAmountInputACB}
            onPaidByChange={handlePaidByChangeACB}
            onToggleParticipants={handleToggleParticipantsACB}
            onAddExpense={handleAddExpenseACB}
            onCancelExpense={handleCancelExpenseACB}
        />
    );
}
