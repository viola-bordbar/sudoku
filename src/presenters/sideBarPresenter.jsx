import { SideBarView } from "../views/sideBarView";

export function SideBar(props) {
    return (
            <SideBarView
                people={props.model.people}
                expenses={props.model.expenses}
                sumOfCosts={props.model.sumOfCosts}
            />
        );
}