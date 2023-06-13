import { InfinitySpin } from "react-loader-spinner";

export function Loader(){
    return(<div className="loader-container"><InfinitySpin
    height="200"
    width="200"
    color="rgba(199, 237, 230, 1)"
    ariaLabel="triangle-loading"
    wrapperStyle={{}}
    wrapperClassName="loader"
    visible={true}
  /></div>);
}