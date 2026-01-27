import { StartPageView } from "../views/startPageView";
import { SideBar } from "./sideBarPresenter.jsx";

export function StartPage(props) {
    //show people form
    function handleShowPersonInputACB() {
        props.model.showPersonInput = true;
    }

    //for when user is typing (draft)
    function handlePersonInputACB(person) {
        props.model.newPerson = person;
    }

    //adding a new person
    function handleAddNewPersonACB() {
        props.model.addNewPerson();
        console.log("clicked add person", props.model.showSidebar);
    }

    //cancel adding a new person
    function handleCancelPersonACB() {
        // put this in model function together with resetting input fields: props.model.showPersonInput = false;
        props.model.cancelPerson();
    }

    //for expenses
    function handleShowExpenseInputACB() {
        props.model.showExpenseInput = true;
    }

    //expense title input
    function handleExpenseTitleInputACB(title) {
        props.model.expenseTitle = title;
    }

    //expense amount input
    function handleExpenseAmountInputACB(value) {
        props.model.expenseAmount = value;
    }

    //choosing who paid
    function handlePaidByChangeACB(person) {
        props.model.paidBy = person;
    }

    //??
    function handleToggleParticipantsACB(person) {
        props.model.toggleParticipants(person);
    }

    //adding a new expense
    function handleAddExpenseACB() {
        props.model.addExpense();
    }

    //cancel adding a new expense
    function handleCancelExpenseACB() {
        // put this in model function together with resetting input fields: props.model.showExpenseInput = false;
        props.model.cancelExpense();
    }

    return (
        <div>
            <StartPageView
                people={props.model.people}
                expenses={props.model.expenses}
                
                showPersonInput={props.model.showPersonInput}
                newPerson={props.model.newPerson}
                onShowPersonInput={handleShowPersonInputACB}
                onPersonInputChange={handlePersonInputACB}
                onAddNewPerson={handleAddNewPersonACB}
                onCancelPerson={handleCancelPersonACB}

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
                onAddNewExpense={handleAddExpenseACB}
                onCancelExpense={handleCancelExpenseACB}
            />

            {<SideBar model={props.model} /> && props.model.showSidebar}
        </div>
    );
}
