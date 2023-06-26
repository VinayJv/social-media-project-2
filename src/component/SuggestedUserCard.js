import { useDataContext } from "../context/dataContext";
import { SuggestedUser } from "./SuggestedUsers";

export function SuggestedUserCard(){
    const {theme, state} = useDataContext();

    return(<div className="follow-section-container"  style={{borderRight: `1px solid ${theme.textColor}`}}>
    <div className="follow-user" style={{backgroundColor: theme.themeColor2, borderRadius: "5px", boxShadow: theme.boxShadow}}>
       <h2>Suggested Users</h2>
        <div style={{display: "flex", flexDirection: "column-reverse"}}>
            {state.allUsers.map((user)=><SuggestedUser data={user}/>)}
        </div>
    </div>
</div>)
}