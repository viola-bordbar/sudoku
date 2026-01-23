import { containsIgnoreCase, allInArray } from "./utilities.js";

export const model = {
    people: [],
    expenses: [],
    showPersonInput: false,
    showExpenseInput: false,
    newPerson: "",
    expenseTitle: "",
    expenseAmount: "",
    paidBy: "",
    selectedParticipants: [],
    sumOfCosts: 0,

    addNewPerson() {
        const name = (this.newPerson || "").trim();
        if(!name) return;

        if(containsIgnoreCase(this.people, name))  return;
        
        this.people.push(name);
        this.newPerson = "";
        this.showPersonInput = false;
    },

    cancelPerson() {
        this.newPerson = "";
        this.showPersonInput = false;
    },

    toggleParticipants(person) {
        if(!person) return;
        const index = this.selectedParticipants.indexOf(person);
        if(index === -1) {
            this.selectedParticipants.push(person);
        } else {
            this.selectedParticipants.splice(index, 1);
        }
    },

    addExpense() {
        const title = (this.expenseTitle || "").trim();
        const amount = Number(this.expenseAmount);
        const paidBy = this.paidBy;
        const participants = this.selectedParticipants.length > 0 ? [...this.selectedParticipants] : [...this.people];

        if(!title) return;
        if(!Number.isFinite(amount) || amount <= 0) return;
        if(!paidBy) return;
        if(!this.people.includes(this.paidBy)) return;
        if(!allInArray(participants, this.people)) return;

        this.expenses.push({title: title, amount: amount, paidBy: paidBy, participants: participants});
        this.sumOfCosts += amount;
        
        this.expenseTitle = "";
        this.expenseAmount = "";
        this.paidBy = "";
        this.selectedParticipants = [];
        this.showExpenseInput = false;
    },

    cancelExpense() {
        this.expenseTitle = "";
        this.expenseAmount = "";
        this.paidBy = "";
        this.selectedParticipants = [];
        this.showExpenseInput = false;
    },

};
